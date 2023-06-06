<?php

namespace Database\Seeders;

use App\Models\State;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $states = array(
            array('state' => 'ABIA','Zone' => ''),
            array('state' => 'ADAMAWA','Zone' => ''),
            array('state' => 'AKWA IBOM','Zone' => ''),
            array('state' => 'ANAMBRA','Zone' => ''),
            array('state' => 'BAUCHI','Zone' => ''),
            array('state' => 'BAYELSA','Zone' => ''),
            array('state' => 'BENUE','Zone' => ''),
            array('state' => 'BORNO','Zone' => ''),
            array('state' => 'CROSS RIVER','Zone' => ''),
            array('state' => 'DELTA','Zone' => ''),
            array('state' => 'EDO','Zone' => ''),
            array('state' => 'EBONYI','Zone' => ''),
            array('state' => 'EKITI','Zone' => ''),
            array('state' => 'ENUGU','Zone' => ''),
            array('state' => 'GOMBE','Zone' => ''),
            array('state' => 'IMO','Zone' => ''),
            array('state' => 'JIGAWA','Zone' => ''),
            array('state' => 'KADUNA','Zone' => ''),
            array('state' => 'KANO','Zone' => ''),
            array('state' => 'KATSINA','Zone' => ''),
            array('state' => 'KEBBI','Zone' => ''),
            array('state' => 'KOGI','Zone' => ''),
            array('state' => 'KWARA','Zone' => ''),
            array('state' => 'LAGOS','Zone' => ''),
            array('state' => 'NIGER','Zone' => ''),
            array('state' => 'OGUN','Zone' => ''),
            array('state' => 'ONDO','Zone' => ''),
            array('state' => 'OSUN','Zone' => ''),
            array('state' => 'OYO','Zone' => ''),
            array('state' => 'NASARAWA','Zone' => ''),
            array('state' => 'PLATEAU','Zone' => ''),
            array('state' => 'RIVERS','Zone' => ''),
            array('state' => 'SOKOTO','Zone' => ''),
            array('state' => 'YOBE','Zone' => ''),
            array('state' => 'ZAMFARA','Zone' => ''),
            array('state' => 'ABUJA','Zone' => ''),
            array('state' => 'TARABA','Zone' => '')
          );

          foreach($states as $state){
            State::create($state);
          }
    }
}
