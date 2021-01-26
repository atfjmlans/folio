<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Repository\ContactRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class FrontendController extends AbstractController
{
    /**
     * @Route("/", name="home", methods={"GET"})
     */
    public function index(): Response
    {
        return $this->render('frontend/index.html.twig', [
            'controller_name' => 'FrontendController',
        ]);
    }
    
    /**
     * @Route("/", name="contact", methods={"POST"})
     */
    public function contact(Request $request): Response
    {
        
        if ($request->isXmlHttpRequest()) {
            
            $contactName    = $request->request->get('contactName');
            $contactEmail   = $request->request->get('contactEmail');
            $contactPhone   = $request->request->get('contactPhone');
            $contactMessage = $request->request->get('contactMessage');
            
            $contact = new Contact();
            $contact->setContactName($contactName);
            $contact->setContactEmail($contactEmail);
            $contact->setContactPhone($contactPhone);
            $contact->setContactMessage($contactMessage);

            // you can fetch the EntityManager via $this->getDoctrine()
            $entityManager = $this->getDoctrine()->getManager();
            
            // tell Doctrine you want to (eventually) save the Data (no queries yet)
            $entityManager->persist($contact);
    
            // actually executes the queries (i.e. the INSERT query)
            $entityManager->flush($contact);
    
            // creates a json Response with a 200 status code (the default)
            $response = new Response();
            return $this->json($response, $status = 200, $headers = ['Content-Type', 'application/json']);
        } else {
            return 'Something went wrong, please try again!';
        }
    }
}
