<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Log;
use File;
use Image;

class ProductController extends Controller
{
    //
    public function index()
    {
        $product = Product::orderBy('id','Desc')->get();

        return response([
            'product'=> $product
        ]);
    }

    public function store(Request $request)
    {


        // $file=$request->input('image');


        // list($imgType, $imgBase64) = explode(';', $file);
        // list(, $imgBase64) = explode(',', $imgBase64);
        // $fileName =str_random(10) . '.png';
        // $path = public_path() . "/Images/Products/" . $fileName;
        // file_put_contents($path, base64_decode($imgBase64));


            // $data=$request->data;

        try{ 

  

            $product=new Product;
            $product->name=$request->input('name');
            $product->slug=Str_slug($request->input('name'),'-');
            $product->price=$request->input('price');
            $product->short_description=$request->input('short_description');
            $product->description=$request->input('description');
            $product->category_id=$request->input('category_id');

            if($request->input('image'))
            {
            $file=$request->input('image');

            list($imgType, $imgBase64) = explode(';', $file);
            list(, $imgBase64) = explode(',', $imgBase64);
            $fileName =str_random(10) . '.png';
            $path = public_path() . "/Images/Products/" . $fileName;
       

            file_put_contents($path,base64_decode($imgBase64) );

            $image = Image::make($path)->resize(800, 480);
            $image=$image->save($path);

            $product->image=$fileName;

            }
            $product->save();

            return response([
                'message'=> 'success',

            ]);
               
    
          
        }catch(\Exception $e){
            return response([
                'message'=>'error',
            ]);
        }
          
        
    }


    public function edit($id)
    {
        $product= Product::where('id',$id)->first();
        return response([
            'message'=>'success',
            'product'=>$product,
        ]);
    }


    public function update(Request $request,$id)
    {


        // $file=$request->input('image');


        // list($imgType, $imgBase64) = explode(';', $file);
        // list(, $imgBase64) = explode(',', $imgBase64);
        // $fileName =str_random(10) . '.png';
        // $path = public_path() . "/Images/Products/" . $fileName;
        // file_put_contents($path, base64_decode($imgBase64));


            // $data=$request->data;

        try{ 

  

            $product=Product::find($id);
            $product->name=$request->input('name');
            $product->slug=Str_slug($request->input('name'),'-');
            $product->price=$request->input('price');
            $product->short_description=$request->input('short_description');
            $product->description=$request->input('description');
            $product->category_id=$request->input('category_id');


            if($request->input('image'))
            {
                $file=$request->input('image');

                list($imgType, $imgBase64) = explode(';', $file);
                list(, $imgBase64) = explode(',', $imgBase64);
                $fileName =str_random(10) . '.png';
                $path = public_path() . "/Images/Products/" . $fileName;
    
                file_put_contents($path,base64_decode($imgBase64) );
                
                
                $image = Image::make($path)->resize(800, 480);
                $image=$image->save($path);
    
                $product->image=$fileName;

            }

            $product->save();

            return response([
                'message'=> 'success',

            ]);
               
    
          
        }catch(\Exception $e){
            return response([
                'message'=>'error',
            ]);
        }
          
        
    }


    public function  delete($id)
    {
        $product=Product::find($id);
        $product->delete();
        $image_path='Images/Products/';
        //  unlink($path,$product->image );
        if(file_exists($image_path.$product->image))
        {
          unlink($image_path.$product->image);
        }
        return response([
            'message'=>'success',
            'product'=>$product,
        ]);
    }
}
