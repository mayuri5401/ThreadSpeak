# =============================================================================
# ThreadSpeak Microservices Ecosystem Launcher (PowerShell)
# Launches Eureka, API Gateway, and all 4 domain microservices
# =============================================================================

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host " Starting ThreadSpeak Microservices Ecosystem..." -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

# 1. Start Eureka Server (Port 8761)
Write-Host "[1/6] Launching Eureka Discovery Server (Port 8761)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\eureka-server'; Write-Host '--- EUREKA SERVER (Port 8761) ---' -ForegroundColor Cyan; mvn spring-boot:run"

Write-Host "Waiting 8 seconds for Eureka Server initialization..." -ForegroundColor Gray
Start-Sleep -Seconds 8

# 2. Start API Gateway (Port 8080)
Write-Host "[2/6] Launching API Gateway (Port 8080)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\api-gateway'; Write-Host '--- API GATEWAY (Port 8080) ---' -ForegroundColor Green; mvn spring-boot:run"

# 3. Start Content Service (Port 8081)
Write-Host "[3/6] Launching Content Service (Port 8081)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\content-service'; Write-Host '--- CONTENT SERVICE (Port 8081) ---' -ForegroundColor Magenta; mvn spring-boot:run"

# 4. Start User Service (Port 8082)
Write-Host "[4/6] Launching User Service (Port 8082)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\user-service'; Write-Host '--- USER SERVICE (Port 8082) ---' -ForegroundColor Blue; mvn spring-boot:run"

# 5. Start Quiz Service (Port 8083)
Write-Host "[5/6] Launching Quiz Service (Port 8083)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\quiz-service'; Write-Host '--- QUIZ SERVICE (Port 8083) ---' -ForegroundColor DarkYellow; mvn spring-boot:run"

# 6. Start Code Runner Service (Port 8084)
Write-Host "[6/6] Launching Code Runner Service (Port 8084)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\code-runner-service'; Write-Host '--- CODE RUNNER SERVICE (Port 8084) ---' -ForegroundColor DarkCyan; mvn spring-boot:run"

Write-Host "`nAll 6 Microservices are launching!" -ForegroundColor Green
Write-Host "-------------------------------------------------------" -ForegroundColor Gray
Write-Host " Eureka Dashboard: http://localhost:8761" -ForegroundColor White
Write-Host " API Gateway:      http://localhost:8080" -ForegroundColor White
Write-Host " Content Service:  http://localhost:8081" -ForegroundColor White
Write-Host " User Service:     http://localhost:8082" -ForegroundColor White
Write-Host " Quiz Service:     http://localhost:8083" -ForegroundColor White
Write-Host " Code Runner:      http://localhost:8084" -ForegroundColor White
Write-Host "-------------------------------------------------------" -ForegroundColor Gray
