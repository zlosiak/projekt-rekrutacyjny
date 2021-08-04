<?php
 $response = [];
      if(!$_POST['firstName'] ){          
            $response['firstName']['error'] = 'Podaj swoje imię2 [server]';
      }
    
      if(!$_POST['name'] ){           
            $response['name']['error'] = 'Podaj swoje nazwisko [server]';
      } 
      
      if (!$_POST['email'] ){   
            $response['email']['error'] = 'Podaj adres email [server]';
      }

      if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
            $response['email']['error'] = 'Podaj prawidłowy adres e-mail [server]';
      }
      
      if (!$_POST['message'] ){   
            $response['message']['error'] = 'Napisz wiadomość [server]';
      }
      if ( $_POST['statute'] != 'true' ){
            $response['statute']['error'] = 'Zaakceptuj RODO [server]';
      }          
      echo json_encode($response)
?>
