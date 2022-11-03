<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReplyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'created_at' => $this->created_at->format("d F, Y"),
            'user' => [
                'id' => $this->user_id,
                'name' => $this->user->name,
                'picture' => $this->user->picture()
            ]
        ];
    }
}
