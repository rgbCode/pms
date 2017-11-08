<?php
class Biz extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->library('session');

        $hd = apache_request_headers();
        header('Content-Type: application/json');
        if(isset($hd['origin'])) {
            header('Access-Control-Allow-Origin: '.$hd['origin']);
            header('Access-Control-Allow-Credentials: true');
        }
    }

    public function index() {
        $this->session->set_userdata('some_name', 'some_value');
        echo '{"rs":1}';
    }
    public function list() {
        echo '{"some_name": "'.$this->session->userdata('some_name').'"}';

        // $query = $this->db->query("SELECT * FROM test;");
        // echo json_encode($query->result());
    }
    public function del() {
        $this->session->unset_userdata('some_name');
    }
}