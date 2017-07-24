<?php
/*
* Collect all Details from Angular HTTP Request.
*/
$postdata = file_get_contents("php://input");
$request  = json_decode($postdata);
@$name    = $request->name;
@$email   = $request->email;
@$message = $request->message;

/*
* E-mail settings
*/
$to      = 'ves.velichkov@gmail.com';
$subject = 'The project';
$body = "Име: $name \nИмейл: $email \n\nСъобщение: \n$message";
$headers = 'From: info@theproject.com' . "\r\n" .
    'Reply-To: '. $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $body, $headers);