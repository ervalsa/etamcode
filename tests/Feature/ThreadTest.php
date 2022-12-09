<?php

use App\Models\User;
use App\Models\Thread;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('user terautentikasi bisa melakukan new thread', function () {
    $thread = Thread::factory()->make();
    $this->actingAs($this->user)->post(route('threads.store'), $thread->toArray())->assertRedirect();
});

test('pendatang tidak bisa melakukan new thread', function () {
    $thread = Thread::factory()->make();
    $this->post(route('threads.store'), $thread->toArray())->assertRedirect(route('login'));
});


