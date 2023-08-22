<?php

namespace App\Mail;

use App\Models\Rent;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class sendRentReceipt extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $rent;
    public function __construct(Rent $rent)
    {
        $this->rent = $rent;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Rent Receipt',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.send_rent_receipt',
            with: [
                'occupant' => $this->rent->occupant->user->lastname.' '.$this->rent->occupant->user->firstname,
                'spaceDescription' => $this->rent->space->space_description,
                'amountPaid' => $this->rent->amount_paid,
                'from' => $this->rent->from,
                'to' => $this->rent->to,
                'datePaid' => $this->rent->paid_at
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
