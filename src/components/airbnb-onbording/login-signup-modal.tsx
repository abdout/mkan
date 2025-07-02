"use client"

import React, { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { SocialLoginButtons } from './social-login-buttons'

interface LoginSignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginSignupModal({ isOpen, onClose }: LoginSignupModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] p-0 gap-0">
        {/* Header */}
        {/* <div className="flex items-center justify-center relative px-6 py-4 border-b border-gray-200">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 h-6 w-6 p-1 rounded-xl hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <h2 className="text-base font-bold">Log in or sign up</h2>
        </div> */}

        {/* Main Content */}
        <div className="px-6 py-8 space-y-4">
          {/* Welcome Text */}
          <h3 className="text-[22px] font-medium leading-tight tracking-wide">
            Welcome to Mkan
          </h3>

          {/* Form Section */}
          <div className="space-y-4">
            {/* Input Group */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              {/* Email Input */}
              <div className="relative w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-3 text-base bg-transparent outline-none border-b border-gray-300 focus:border focus:border-black focus:rounded-lg focus:z-10 relative"
                  placeholder="Email"
                  onFocus={() => {
                    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                    if (emailInput) {
                      emailInput.style.borderBottom = '1px solid black';
                    }
                  }}
                  onBlur={() => {
                    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                    if (emailInput) {
                      emailInput.style.borderBottom = '1px solid rgb(209 213 219)';
                    }
                  }}
                />
              </div>

              {/* Password Input */}
              <div className="relative w-full group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-3 text-base bg-transparent outline-none focus:border focus:border-black focus:rounded-lg focus:z-10 relative"
                  placeholder="Password"
                  onFocus={() => {
                    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                    if (emailInput) emailInput.style.borderBottom = 'none';
                  }}
                  onBlur={() => {
                    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                    if (emailInput) emailInput.style.borderBottom = '1px solid rgb(209 213 219)';
                  }}
                />
              </div>
            </div>

            {/* Help Text */}
            <p className="text-xs text-gray-500 leading-relaxed">
              By continuing, you agree to our{' '}
              <span className="underline cursor-pointer">Terms of Service</span> and{' '}
              <span className="underline cursor-pointer">Privacy Policy</span>
            </p>

            {/* Continue Button */}
            <Button 
              className="w-full h-12 bg-[#FF385C] hover:bg-[#E31C5F] text-white font-medium text-base rounded-lg"
              onClick={() => console.log('Continue clicked')}
            >
              Continue
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-xs text-gray-900 font-normal tracking-wider">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <SocialLoginButtons />
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Social Media Icons Components
function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
        fill="#1877F2"
      />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M19.8055 8.0415H19V8H10V12H15.4515C14.527 14.3285 12.4115 16 10 16C6.686 16 4 13.314 4 10C4 6.686 6.686 4 10 4C11.5115 4 12.895 4.577 13.9805 5.5195L16.809 2.691C15.023 1.0265 12.634 0 10 0C4.4775 0 0 4.4775 0 10C0 15.5225 4.4775 20 10 20C15.5225 20 20 15.5225 20 10C20 9.3295 19.931 8.675 19.8055 8.0415Z"
        fill="#FFC107"
      />
      <path
        d="M1.1535 5.3455L4.438 7.797C5.4235 5.554 7.481 4 10 4C11.5115 4 12.895 4.577 13.9805 5.5195L16.809 2.691C15.023 1.0265 12.634 0 10 0C6.159 0 2.828 2.1685 1.1535 5.3455Z"
        fill="#FF3D00"
      />
      <path
        d="M10 20C12.583 20 14.93 19.0115 16.7045 17.404L13.6085 14.785C12.5718 15.5742 11.3038 16.001 10 16C7.599 16 5.4905 14.3415 4.5585 12.027L1.0975 14.5670C2.7525 17.7785 6.1135 20 10 20Z"
        fill="#4CAF50"
      />
      <path
        d="M19.8055 8.0415H19V8H10V12H15.4515C15.011 13.0115 14.308 13.8685 13.6085 14.785L16.7045 17.404C16.4855 17.6025 20 14.5 20 10C20 9.3295 19.931 8.675 19.8055 8.0415Z"
        fill="#1976D2"
      />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M15.044.656c-1.066 0-2.29.623-3.021 1.486-.659.779-1.172 1.907-1.172 3.031 0 .24.033.48.087.702.156.039.325.057.498.057 1.005 0 2.155-.623 2.827-1.565.609-.857 1.089-2.031 1.089-3.231 0-.257-.021-.498-.072-.715-.087-.038-.174-.057-.268-.057l.032-.708zm2.411 7.034c-2.233 0-3.699 1.89-3.699 4.233 0 3.126 2.389 6.311 4.466 6.311 1.004 0 1.475-.623 2.741-.623 1.267 0 1.64.623 2.741.623 2.078 0 4.466-3.185 4.466-6.311 0-2.343-1.466-4.233-3.699-4.233-1.005 0-1.927.39-2.508.952-.581-.562-1.503-.952-2.508-.952z"
        fill="#000"
      />
    </svg>
  )
} 