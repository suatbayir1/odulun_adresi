<?php

class Message_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllMessage() {
        $query = "SELECT * FROM TBL_MESSAGE WHERE email is not null";
        $result = $this->db->query($query)->result();
        return $result;
    }
}