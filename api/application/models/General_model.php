<?php 

class General_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function sendMessageToAdmin($payload) {
        $query = "INSERT INTO TBL_MESSAGE(email, message, status) VALUES(?, ?, ?)";
        $result = $this->db->query($query, [$payload["email"], $payload["message"], "new"]);

        return "sent_message";
    }

    public function getHomeGeneralInfo() {
        $userQuery = "SELECT sum(totalPrize) as totalPrize, count(*) as totalUserCount FROM TBL_USER";
        $userResult = (array) $this->db->query($userQuery)->result()[0];

        $tournamentQuery = "SELECT count(*) as tournamentCount FROM TBL_TOURNAMENT";
        $tournamentResult = (array) $this->db->query($tournamentQuery)->result()[0];

        $sweepstakeQuery = "SELECT count(*) as sweepstakeCount FROM TBL_SWEEPSTAKE";
        $sweepstakeResult = (array) $this->db->query($sweepstakeQuery)->result()[0];

        $result = array_merge($userResult, $tournamentResult, $sweepstakeResult);

        return $result;
    }

    public function updateGeneralInfo($payload) {
        $query = "UPDATE TBL_GENERAL set youtubeUrl = ?, facebookUrl = ?, instagramUrl = ?, discordUrl = ?, phone = ?, whoAreWe = ?, nimotvUrl = ?, twitchUrl = ?";
        $result = $this->db->query($query, [$payload["youtube"], $payload["facebook"], $payload["instagram"], $payload["discord"], $payload["phone"], $payload["whoAreWe"], $payload["nimotv"], $payload["twitch"]]);
        return "updated";
    }

    public function getGeneralInfo() {
        $query = "SELECT * FROM TBL_GENERAL";
        $result = (array) $this->db->query($query)->result()[0];

        return $result;
    }

    public function getAllCities() {
        $query = "SELECT * FROM city";
        $result = $this->db->query($query)->result();
        return $result;
    }

    public function getTowns($payload) {
        $query = "SELECT * FROM town WHERE CityID = ?";
        $result = $this->db->query($query, $payload["cityId"])->result();
        return $result;
    }

    public function getMultipleTowns($payload) {
        $cityIds = [];

        foreach ($payload["cities"] as $city) {
            $query = "SELECT * FROM city WHERE CityName = ?";
            $result = (array) $this->db->query($query, [$city])->result()[0];
            array_push($cityIds, $result["CityID"]);
        }
        
        $towns = [];

        foreach ($cityIds as $id) {
            $townQuery = "SELECT * FROM town WHERE CityID = ?";
            $townResult = $this->db->query($townQuery, [$id])->result();

            foreach($townResult as $town) {
                $town = (array) $town;
                array_push($towns, $town["TownName"]);
            }
        }

        return $towns;
    }

    public function changeLogo($filename, $username) {
        $query = "UPDATE TBL_GENERAL set logo = ?";
        $this->db->query($query, [$filename]);
    }
}