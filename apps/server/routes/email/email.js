module.exports.email = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Poppins:wght@200;300;400;500;600;700&display=swap"
    rel="stylesheet">
  <title>Email Verification</title>
  <style>
    body{
      font-family: 'Poppins', sans-serif;
      padding: 20px;
    }
    .verifyButton{
      background-color: #d71d1d;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 0px;
      cursor: pointer;
    }
  </style>
</head>
<body>
    <div style="align-items:center;justify-content: center;display:flex;background-color: rgb(255, 255, 255);flex-direction: column;flex-wrap: wrap;gap: 0px;line-height: 20px;">
      <div style="text-align:center;">
        <img src="./lekhakh.svg" width="20px" alt="" srcset="">
        <h3>Thank you for joining Lekhakh</h3>
        <h1>Email Verification</h1>
        <p>Please click the button below to verify your email</p>
        <button class="verifyButton">Verify Now</button>
      </div>
    </div>
</body>
</html>`