$app = [System.IO.File]::ReadAllText('c:\Users\Kavyasri\OneDrive\Desktop\portfolio\app.jsx')
$head = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Potluri Divya Sri | React Portfolio</title>
  <meta name="description" content="React Portfolio of Potluri Divya Sri - M.Tech CSE, React Developer, AI Engineer, and NxtWave Intern.">
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

$res = $head + [System.Environment]::NewLine + $app + [System.Environment]::NewLine + $tail
[System.IO.File]::WriteAllText('c:\Users\Kavyasri\OneDrive\Desktop\portfolio\index.html', $res, [System.Text.Encoding]::UTF8)
Write-Output "Successfully updated index.html with inline React script!"
