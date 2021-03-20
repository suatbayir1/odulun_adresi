<?php 

class Home_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function getYoutubeVideos() {
        $query = "SELECT * FROM TBL_YOUTUBE_VIDEO WHERE url is not null ORDER BY rank ASC";
        $result = $this->db->query($query);
        return $result->result();
    }

    public function addYoutubeVideo($payload) {
        $query = "INSERT INTO TBL_YOUTUBE_VIDEO(title, url, rank) VALUES (?,?,?)";
        $result = $this->db->query($query, [$payload["title"], $payload["url"], $payload["rank"]]);
        return "inserted_video";
    }

    public function deleteYoutubeVideo($payload) {
        $query = "DELETE FROM TBL_YOUTUBE_VIDEO WHERE id = ?";
        $result = $this->db->query($query, [$payload["videoId"]]);
        return "deleted_video";
    }
}