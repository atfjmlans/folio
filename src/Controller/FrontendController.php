<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Repository\ContactRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;


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
     * @Route("/terms", name="terms", methods={"GET"})
     */
    public function terms(): Response
    {
        return $this->render('frontend/terms.html.twig', [
            'controller_name' => 'FrontendController',
        ]);
    }
    
    /**
     * @Route("/", name="contact", methods={"POST"})
     */
    public function contact(Request $request, MailerInterface $mailer): Response
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
            
            $email = (new TemplatedEmail())
                ->from($contactEmail)
                ->to('atifjamalansari@outlook.com')
                ->subject('Reaching out for a new project or just saying hello via Folio, Personal Portfolio.')
                // path of the Twig template to render
                ->htmlTemplate('backend/emails/contact.html.twig')
                // pass variables (name => value) to the template
                ->context([
                    'name' => $contactName,
                    'mail' => $contactEmail,
                    'phone' => $contactPhone,
                    'message' => $contactMessage,
                ]);
            $mailer->send($email);

           // returns response as JSON
            return $this->json(['data' => $contact, 'status' => 200]);

        } else {
            return 'Something went wrong, please try again!';
        }
    }
}
