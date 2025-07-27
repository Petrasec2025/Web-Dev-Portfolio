<?php
header('Content-Type: application/json');

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = strip_tags(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST['subject']));
    $message = strip_tags(trim($_POST['message']));
    
    // Validate inputs
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            'success' => false, 
            'message' => 'Please fill all required fields correctly'
        ]);
        exit;
    }
    
    // Set recipient email
    $recipient = "petrasec.cyber@gmail.com";
    
    // Set email subject
    $email_subject = $subject ?: "New contact from $name - PeTsec Website";
    
    // Build email content
    $email_content = "You have received a new message from your website contact form.\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Subject: $subject\n\n";
    $email_content .= "Message:\n$message\n";
    
    // Build email headers
    $email_headers = "From: $name <$email>\r\n";
    $email_headers .= "Reply-To: $email\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();
    
    // Additional headers for better deliverability
    $email_headers .= "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-type: text/plain; charset=UTF-8\r\n";
    
    // Send email
    $mail_sent = mail($recipient, $email_subject, $email_content, $email_headers);
    
    if ($mail_sent) {
        http_response_code(200);
        echo json_encode([
            'success' => true, 
            'message' => 'Thank you! Your message has been sent successfully.'
        ]);
    } else {
        // Log the error for debugging
        error_log("Failed to send email to: $recipient");
        http_response_code(500);
        echo json_encode([
            'success' => false, 
            'message' => 'Oops! Something went wrong. Please try again later.'
        ]);
    }
} else {
    http_response_code(403);
    echo json_encode([
        'success' => false, 
        'message' => 'There was a problem with your submission. Please try again.'
    ]);
}
?>
