<?php

class Home extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model("Home_model");
        getHeader();
    }

    public function getYoutubeVideos() {
        $result = $this->Home_model->getYoutubeVideos();
        return returnResponse(true, ["get_youtube_videos"], $result);
    }

    public function addYoutubeVideo() {
        $request = getRequest();
        $result = $this->Home_model->addYoutubeVideo($request);
        return returnResponse(true, [$result]);
    }

    public function deleteYoutubeVideo() {
        $request = getRequest();
        $result = $this->Home_model->deleteYoutubeVideo($request);
        return returnResponse(true, [$result]);
    }

}