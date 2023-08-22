<x-mail::message>
# Rent Receipt

Hello, 
{{$occupant}}, This is the receipt issued in respect to the rent paid on {{$datePaid}}

<x-mail::table>
| Details     |   Values                  |
| :---------- | ------------------------: |
| Space       | **{{$spaceDescription}}** |
| Amount Paid | **{{$amountPaid }}**      |
| From        | **{{$from }}**            |
| To          | **{{$to}}**               |
</x-mail::table>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
