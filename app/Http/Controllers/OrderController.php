<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Order;
use Illuminate\Http\Request;
use Response;
use Gate;
class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        Gate::authorize('view','orders');
        $orders = Order::paginate();

        return OrderResource::collection($orders);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        Gate::authorize('view','orders');
        return new OrderResource($order);
    }


    public function export(){
        Gate::authorize('view','orders');
        $headers = [
            'Content-type'  => 'text/csv',
            'Content-Disposition'=> 'attachment; filename=orders.csv',
            'Pragma'    => 'no-cache',
            'Cache-control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires=0'
        ];

        $calback = function(){
            $orders = Order::all();
            $file = fopen('php://output','w');

            //Header
            fputcsv($file, ['Id','Name','Email','Product Title','Price','Quantity']);

            //Body
            foreach($orders as $order){
                fputcsv($file, [$order->id,  $order->name, $order->email, '','','']);
                foreach($order->orderItems() as $item){
                    fputcsv($file, ['','', '', $item->product_title, $item->price, $item->quantity]);
                }
            }

            fclose($file);
        };


        return Response::stream($calback, 200, $headers);
    }
}
