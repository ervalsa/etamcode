<?php

namespace App\Http\Controllers;

use App\Models\Reply;
use App\Models\Thread;
use Illuminate\Http\Request;
use Psy\Util\Str;

class LikeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function __invoke(Request $request)
    {
        abort_if(!$request->hasAny(['thread'. 'reply']), 404);

        $model_name = "App\Models\\" . Str::studly($request->keys()[0]);

        $model = $model_name::find($request->get($request->keys()[0]));
        $toogle = $model
            ->likes()
            ->where(
                'user_id',
                $request
                    ->user()->id
                    ->exists()) ? 'delete' : 'save'
            ;
        $request->user()->likes->$toogle($model->likes()->make());

        return redirect(route('threads.index'));
    }
}
