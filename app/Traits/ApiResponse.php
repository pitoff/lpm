<?php

namespace App\Traits;

trait ApiResponse
{
    protected function success($data, $message = null, $code = 200)
    {
        return response()->json([
            'status' => 'Request was successful',
            'message' => $message,
            'data' => $data,
            'statusCode' => $code
        ], $code);
    }

    protected function error($message = null, $code)
    {
        return response()->json([
            'status' => 'Something went wrong',
            'message' => $message,
            'statusCode' => $code
        ], $code);
    }
}


