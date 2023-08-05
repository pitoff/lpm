<x-mail::message>
# Password-Reset

Please, Click on the link provided below to reset password. <br>Link expires in 5 minutes.

<x-mail::button :url="'http://127.0.0.1:3000/auth/reset-login-details/'.$token">
Button Text
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
