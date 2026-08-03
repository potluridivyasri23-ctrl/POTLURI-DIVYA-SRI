$components = @(
  'c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\components\ParticleCanvas.jsx',
  'c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\components\Navbar.jsx',
  'c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\components\Hero.jsx',
  'c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\components\StatsBar.jsx',
  'c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\components\About.jsx',
  'c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\components\FrontendShowcase.jsx',
  'c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\components\Skills.jsx',
  'c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\components\Experience.jsx',
  'c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\components\Projects.jsx',
  'c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\components\AiAgent.jsx',
  'c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\components\EducationAndVolunteering.jsx',
  'c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\components\Contact.jsx',
  'c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\components\ProjectModal.jsx',
  'c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\components\ResumeModal.jsx',
  'c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\components\Toast.jsx',
  'c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\components\Footer.jsx'
)

$combinedCode = "const { useState, useEffect, useRef } = React;`n`n"

foreach ($file in $components) {
  $content = [System.IO.File]::ReadAllText($file)
  # Strip ES6 imports and exports for standalone browser execution
  $content = $content -replace "import React.*?;`r?`n", ""
  $content = $content -replace "export default function ", "function "
  $combinedCode += $content + "`n`n"
}

# Add main App component
$appMainContent = [System.IO.File]::ReadAllText('c:\Users\Kavyasri\OneDrive\Desktop\portfolio\src\App.jsx')
$appMainContent = $appMainContent -replace "import .*?;`r?`n", ""
$appMainContent = $appMainContent -replace "export default function ", "function "
$combinedCode += $appMainContent + "`n`n"
$combinedCode += "const rootElement = document.getElementById('root');`nconst root = ReactDOM.createRoot(rootElement);`nroot.render(<App />);`n"

[System.IO.File]::WriteAllText('c:\Users\Kavyasri\OneDrive\Desktop\portfolio\app.jsx', $combinedCode, [System.Text.Encoding]::UTF8)

# Now update index.html with the combined script
$head = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Potluri Divya Sri | React Portfolio</title>
  <meta name="description" content="React Portfolio of Potluri Divya Sri - M.Tech CSE, React Developer, Frontend Instructor Training at NxtWave.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;family=Fira+Code:wght@400;500&amp;display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet"/>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="dark-theme accent-cyan">
  <div id="root"></div>
  <script type="text/babel">
"@

$tail = @"

  </script>
</body>
</html>
"@

$res = $head + [System.Environment]::NewLine + $combinedCode + [System.Environment]::NewLine + $tail
[System.IO.File]::WriteAllText('c:\Users\Kavyasri\OneDrive\Desktop\portfolio\index.html', $res, [System.Text.Encoding]::UTF8)

Write-Output "Successfully updated app.jsx and index.html with Frontend Instructor Training role!"
