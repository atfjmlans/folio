<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Form\RegistrationFormType;
use App\Security\Authenticator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;


class RegistrationController extends AbstractController
{
    /**
     * @Route("/register", name="register")
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder, GuardAuthenticatorHandler $guardHandler, Authenticator $authenticator): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // encode the plain password
            $user->setPassword(
                $passwordEncoder->encodePassword(
                    $user,
                    $form->get('password')->getData()
                )
            );

            // creating an administrator account if no account is present
            $user = $this->entityManager->getRepository(User::class)->findAll();
            $roles = (!isset($user)) ? $user->setRoles( array('ROLE_ADMIN') ) : null ;

            // setting specific roles to a given users
            $roles = $form->get('roles')->getData();
            switch ($roles) {
                // somebody who has access to all the administration features within a single site.
                case 'administrator':
                    $user->setRoles( array('ROLE_ADMIN') );
                    break;
                // somebody who can publish and manage posts including the posts of other users.
                case 'editor':
                    $user->setRoles( array('ROLE_EDITOR') );
                    break;
                // somebody who can publish and manage their own posts.
                case 'author':
                    $user->setRoles( array('ROLE_AUTHOR') );
                    break;
                // somebody who can write and manage their own posts but cannot publish them.
                case 'contributor':
                    $user->setRoles( array('ROLE_CONTRIBUTOR') );
                    break;
                default:
                // somebody who can only manage their profile.
                    $user->setRoles( array('ROLE_SUBSCRIBER') );
                    break;
            }

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();
            // do anything else you need here, like send an email

            return $guardHandler->authenticateUserAndHandleSuccess(
                $user,
                $request,
                $authenticator,
                'main' // firewall name in security.yaml
            );
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form->createView(),
        ]);
    }
}
