<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    //
    public function index()
    {
        $category = Category::select('id','name','status')->get();

        return response([
            'category'=> $category
        ]);
    }

    public function store(Request $request)
    {

    
        $data=$request->data;
        try{ 
            $category=Category::create([
                'name'=>$data['name'],
                'slug'=>Str_slug($data['name'],'-'),
          
            ]);

            // $branch=Branch::select('id','name')->get();
            return response([
                'message'=> 'success'
            ]);
        }catch(\Exception $e){
            return response([
                'message'=>'error'
            ]);
        }
    }

    public function edit($id)
    {
        $category= Category::where('id',$id)->first();
        return response([
            'message'=>'success',
            'category'=>$category,
        ]);
    }


    public function update(Request $request,$id)
    {      
        $data =  $request->data;
        try{ 
                                          
            $c=Category::find($id);
            $c->name = $data['name'];
            $c->slug=Str_slug($data['name'],'-');
            $c->save();
            return response([
                'message'=> 'success'
            ]);
        }catch(\Exception $e){
            return $e;
            return response([
                'message'=>'error'
            ]);
        }

    }


    public function  delete($id)
    {
        $category=Category::find($id);
        $category->delete();
        return response([
            'message'=>'success',
            'category'=>$category,
        ]);
    }
}
