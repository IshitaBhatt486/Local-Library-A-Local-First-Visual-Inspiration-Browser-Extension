param([string]$Channel = "chrome")
$root = Split-Path -Parent $PSScriptRoot
Push-Location $root
npm.cmd run build
$output = Join-Path $root "release"
New-Item -ItemType Directory -Force -Path $output | Out-Null
$archive = Join-Path $output "local-library-$Channel.zip"
if (Test-Path $archive) { Remove-Item -LiteralPath $archive }
Compress-Archive -Path "dist\*" -DestinationPath $archive
Pop-Location
Write-Output $archive
