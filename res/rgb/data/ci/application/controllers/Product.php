<?php
class Product extends CI_Controller {
    public function index()
    {
        $this->load->view('product/list');
    }

    public function list(){
        $this->load->view('product/list');
    }
}