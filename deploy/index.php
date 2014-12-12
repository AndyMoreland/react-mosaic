<?php
$deployKey = isset($_GET['key']) ? $_GET['key'] : '';
$command = 'sh deploy.sh '.$deployKey;
echo 'command: '.$command;
$output = shell_exec($command);
echo "<pre>$output</pre>";