import React from 'react'

export default function BlogPage() {
   return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Mijn Blog</h1>
      
      <div className="space-y-6">
        {/* Hier komen straks onze blog artikelen */}
        <div className="border p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Mijn Eerste Blog Post</h2>
          <p className="text-gray-600 mb-4">28 augustus 2025</p>
          <p>Dit is mijn allereerste blog artikel! Wat spannend...</p>
        </div>
      </div>
    </div>
  )
}
