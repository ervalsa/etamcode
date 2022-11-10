<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReplyResource;
use App\Http\Resources\ThreadResource;
use App\Models\Category;
use App\Models\Thread;
use Illuminate\Auth\Access\Gate;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ThreadController extends Controller
{
    public function __construct() {
        $this->middleware('auth')->except(['index', 'show']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $threads = Thread::query()->with(['category', 'user'])
            ->when($request->category, fn ($q, $slug) => $q->whereBelongsTo(Category::whereSlug($slug)->first()))
            ->when($request->search, fn ($q, $key) => $q->where('title', 'like', "%{$key}%"));
        return inertia('Threads/Index', [
            'threads' => ThreadResource::collection($threads->latest()->paginate()->withQueryString()),
            'filter' => $request->only(['search', 'page'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Threads/Create', [
            'categories' => Category::get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required'],
            'body' => ['required'],
            'category_id' => ['required']
        ]);

        $thread = $request->user()->threads()->create([
            'title' => $name = $request->title,
            'slug' => Str::slug($name .'-'. Str::random(6)),
            'body' => $request->body,
            'category_id' => $request->category_id

        ]);

        return redirect(route('threads.show', $thread));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function show(Thread $thread)
    {
        $thread = (new ThreadResource($thread->loadCount('likes')))->additional([
            'replies' =>
                ReplyResource::collection(
                    $thread
                        ->replies()
                        ->withCount('likes')
                        ->whereNull('parent_id')
                        ->get()
                ),
        ]);

        return inertia('Threads/Show', [
            'thread' => $thread,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function edit(Thread $thread)
    {
        return inertia('Threads/Edit', [
            'categories' => Category::get(),
            'thread' => $thread
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Thread $thread)
    {
        $this->authorize('update', $thread);

        $request->validate([
            'title' => ['required'],
            'body' => ['required'],
            'category_id' => ['required']
        ]);

        $thread->update([
            'title' => $request->title,
            'body' => $request->body,
        ]);

        return redirect(route('threads.show', $thread));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function destroy(Thread $thread)
    {
        $this->authorize('delete', $thread);
        $thread->delete();
        return redirect(route('threads.index'));
    }
}
