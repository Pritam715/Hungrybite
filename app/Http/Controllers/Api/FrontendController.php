<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;

class FrontendController extends Controller
{
      //GetCategory
      public function getCategory()
      {
  
        $category = Category::select('id','name','status')->get();

          return response(
              [
                  'message'=>'Success',
                  'category'=>$category,
              ]
              );
      }



      //GetAllMenu
      public function getAllMenu()
      {
  
        //  console.log('hello');
        $allmenu= Product::all();
          return response(
              [
                  'message'=>'Success',
                  'allmenu'=>$allmenu,
              ]
              );
      }


      //GetMenu
      public function getMenu($id)
      {
  
        if($id == '0')
        {
            $menu= Product::orderBy('id','Desc')->get();
            return response(
                [
                    'message'=>'Success',
                    'menu'=>$menu,
                ]
                );
        }
         else{
            $menu= Product::where('category_id',$id)->orderBy('id','Desc')->get();
            return response(
                [
                    'message'=>'Success',
                    'menu'=>$menu,
                ]
                );

         }
     
      }


      //GetMenuData
      public function getMenuData($id)
      {
  
      
            $menudata= Product::where('id',$id)->first();
            return response(
                [
                    'message'=>'success',
                    'menudata'=>$menudata,
                ]
                );

         
     
      }
}
