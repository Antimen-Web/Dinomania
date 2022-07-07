<?php
// header("Content-Type: application/json");
// $data = json_decode(file_get_contents("php://input"));
// echo "Сервер получил следующие данные: имя — $data->name, монеты — $data->coins";

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"));
$filename = 'data.json';
if (file_exists($filename)) {
    $file = file_get_contents('data.json');
} else {
    $file = fopen("data.json", "a+");
}
$taskList = json_decode($file, true);
if (is_array($taskList)) {
    foreach($taskList as &$elem) {
        if ($elem[0][name] == $data->name) {
            $elem[0][score] = $data->score;
            break;
        }
    }
}
else {
    $taskList[] = array($data);
}
file_put_contents('data.json', json_encode($taskList));
$file = file_get_contents('data.json'); 
echo $file;
unset($file);
unset($taskList);

