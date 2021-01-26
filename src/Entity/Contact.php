<?php

namespace App\Entity;

use App\Repository\ContactRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ContactRepository::class)
 */
class Contact
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $contactName;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $contactEmail;

    /**
     * @ORM\Column(type="string", length=15)
     */
    private $contactPhone;

    /**
     * @ORM\Column(type="text")
     */
    private $contactMessage;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContactName(): ?string
    {
        return $this->contactName;
    }

    public function setContactName(string $contactName): self
    {
        $this->contactName = $contactName;

        return $this;
    }

    public function getContactEmail(): ?string
    {
        return $this->contactEmail;
    }

    public function setContactEmail(string $contactEmail): self
    {
        $this->contactEmail = $contactEmail;

        return $this;
    }

    public function getContactPhone(): ?string
    {
        return $this->contactPhone;
    }

    public function setContactPhone(string $contactPhone): self
    {
        $this->contactPhone = $contactPhone;

        return $this;
    }

    public function getContactMessage(): ?string
    {
        return $this->contactMessage;
    }

    public function setContactMessage(string $contactMessage): self
    {
        $this->contactMessage = $contactMessage;

        return $this;
    }
}
