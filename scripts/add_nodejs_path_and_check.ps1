$dir = 'C:\Program Files\nodejs'
$current = [Environment]::GetEnvironmentVariable('Path','User')
if ($current -notlike "*${dir}*") {
  [Environment]::SetEnvironmentVariable('Path', $current + ';' + $dir, 'User')
  Write-Output "ADDED:$dir"
} else {
  Write-Output "ALREADY:$dir"
}
if (Test-Path (Join-Path $dir 'node.exe')) { Write-Output "NODEVERSION:" + (& (Join-Path $dir 'node.exe') --version) } else { Write-Output 'NODE_EXEC_NOTFOUND' }
if (Test-Path (Join-Path $dir 'npm.cmd')) { Write-Output "NPMVERSION:" + (& (Join-Path $dir 'npm.cmd') -v) } else { Write-Output 'NPM_EXEC_NOTFOUND' }
