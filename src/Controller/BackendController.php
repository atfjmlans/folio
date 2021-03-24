<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class BackendController extends AbstractController
{
    /**
     * @Route("/dashboard", name="dashboard", methods={"GET"})
     */
    public function index(): Response
    {
        return $this->render('backend/index.html.twig', [
            'controller_name' => 'BackendController',
        ]);
    }
}
