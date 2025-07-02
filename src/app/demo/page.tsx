"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LoginSignupModal } from '@/components/airbnb-onbording'

export default function ModalDemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Airbnb Login/Signup Modal Demo
        </h1>
        <p className="text-gray-600">
          Click the button below to open the modal based on the Figma design
        </p>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#FF385C] hover:bg-[#E31C5F] text-white px-8 py-2"
        >
          Open Login/Signup Modal
        </Button>
      </div>

      <LoginSignupModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
} 