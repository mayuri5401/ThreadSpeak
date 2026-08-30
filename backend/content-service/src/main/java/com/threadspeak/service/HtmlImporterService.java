package com.threadspeak.service;

import com.threadspeak.entity.TopicEntity;
import com.threadspeak.model.Topic;
import com.threadspeak.repository.TopicRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Stream;

@Service
public class HtmlImporterService {

    private static final Logger log = LoggerFactory.getLogger(HtmlImporterService.class);
    private final TopicRepository topicRepository;

    public HtmlImporterService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    /**
     * Imports all HTML files from a folder and its subfolders into the PostgreSQL database.
     * Subfolder names automatically become Categories if present!
     */
    @Transactional
    public List<TopicEntity> importFolder(String folderPath, String trackId, String defaultCategory) {
        List<TopicEntity> imported = new ArrayList<>();
        Path root = Paths.get(folderPath);

        if (!Files.exists(root) || !Files.isDirectory(root)) {
            log.warn("Folder does not exist or is not a directory: {}", folderPath);
            return imported;
        }

        try (Stream<Path> stream = Files.walk(root)) {
            stream.filter(p -> Files.isRegularFile(p) && (p.toString().endsWith(".html") || p.toString().endsWith(".htm")))
                    .forEach(file -> {
                        try {
                            TopicEntity entity = parseHtmlFile(file, root, trackId, defaultCategory);
                            if (entity != null) {
                                TopicEntity saved = topicRepository.save(entity);
                                imported.add(saved);
                                log.info("Successfully imported HTML topic: [{}] into category [{}]", saved.getTitle(), saved.getCategory());
                            }
                        } catch (Exception e) {
                            log.error("Failed to parse HTML file: {}", file, e);
                        }
                    });
        } catch (IOException e) {
            log.error("Failed to read folder: {}", folderPath, e);
        }

        return imported;
    }

    public TopicEntity parseHtmlFile(Path file, Path root, String trackId, String defaultCategory) throws IOException {
        File f = file.toFile();
        Document doc = Jsoup.parse(f, StandardCharsets.UTF_8.name());

        String filename = file.getFileName().toString().replaceFirst("\\.html?$", "");
        String id = slugify(filename);

        // Determine category from subfolder name if nested, or from <meta name="category">, or default
        String category = defaultCategory;
        Path relativeParent = root.relativize(file.getParent());
        if (relativeParent != null && !relativeParent.toString().isBlank()) {
            category = relativeParent.toString().replace(File.separator, " / ");
        }

        Element metaCat = doc.selectFirst("meta[name=category]");
        if (metaCat != null && !metaCat.attr("content").isBlank()) {
            category = metaCat.attr("content");
        }

        // Title from <h1>, <title>, or filename
        String title = filename;
        Element h1 = doc.selectFirst("h1");
        if (h1 != null && !h1.text().isBlank()) {
            title = h1.text();
        } else if (!doc.title().isBlank()) {
            title = doc.title();
        }

        // Summary from first paragraph or <meta name="description">
        String summary = "";
        Element metaDesc = doc.selectFirst("meta[name=description]");
        if (metaDesc != null && !metaDesc.attr("content").isBlank()) {
            summary = metaDesc.attr("content");
        } else {
            Element p = doc.selectFirst("p");
            if (p != null) summary = p.text();
        }
        if (summary.length() > 300) summary = summary.substring(0, 297) + "...";

        // Deep Dive content: either body html or main container
        Element main = doc.selectFirst("main, article, .content, .container, body");
        String deepDive = main != null ? main.html() : doc.html();

        // Extract Code Snippet if <pre><code> exists
        Topic.CodeSnippet codeSnippet = null;
        Element code = doc.selectFirst("pre code, pre, code");
        if (code != null) {
            String lang = "java";
            for (String cls : code.classNames()) {
                if (cls.startsWith("language-")) lang = cls.replace("language-", "");
            }
            codeSnippet = new Topic.CodeSnippet(
                    lang,
                    code.text(),
                    "Code example extracted from " + title,
                    Map.of("Language", lang, "File", file.getFileName().toString())
            );
        }

        // Build Topic Model
        Topic topic = new Topic(
                id,
                trackId != null ? trackId : "core-java",
                trackId != null && trackId.equals("spring-boot") ? "Spring Boot & Microservices" : "Core & Advanced Java",
                category,
                title,
                id,
                summary.isBlank() ? "Detailed study notes for " + title : summary,
                "Think of " + title + " in simple everyday terms as organized in this lesson.",
                "Detailed explanation and execution architecture for " + title + ".",
                deepDive,
                new ArrayList<>(),
                codeSnippet,
                "generic-flow",
                List.of(category, "HTML Import", "Java"),
                "Intermediate",
                15,
                List.of(
                        new Topic.InteractiveStep(1, "Lesson Overview", "Introduction and concepts for " + title, "Overview"),
                        new Topic.InteractiveStep(2, "Deep-Dive Execution", "In-depth breakdown of lesson material.", "Deep-Dive")
                )
        );

        return TopicEntity.fromModel(topic);
    }

    private String slugify(String input) {
        return input.toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-|-$", "");
    }
}
