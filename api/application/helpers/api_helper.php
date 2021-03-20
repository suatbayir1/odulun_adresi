<?php

function getHeader() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Content-Type: application/json');
}

function returnResponse($success = false, array $message = [], array $data = [], array $summary = [], $code = null) {
    echo json_encode([
        'success' => $success,
        'message' => [
            'text' => $message,
            'code' => $code,
        ],
        'data' => $data,
        'summary' => $summary,
    ]);
}

function getRequest() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!$_POST) {
            $request = json_decode(file_get_contents('php://input'), true);
        }else
            $request = $_POST;
    }
    else{
        $request = $_GET;
    }

    return $request;
}
