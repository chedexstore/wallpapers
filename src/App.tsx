import { useState, useEffect } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "/components/ui/card"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { Download, User, Facebook, Twitter, Instagram, Trash, Menu, Home, Rocket, ZoomIn, ZoomOut, X } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "/components/ui/dialog"

const initialWallpapers = [
  { id: 1, title: "Nature", description: "A beautiful nature wallpaper", url: "https://via.placeholder.com/300", coverUrl: "https://via.placeholder.com/300" },
  { id: 2, title: "City", description: "A vibrant city wallpaper", url: "https://via.placeholder.com/300", coverUrl: "https://via.placeholder.com/300" },
  { id: 3, title: "Abstract", description: "An abstract design wallpaper", url: "https://via.placeholder.com/300", coverUrl: "https://via.placeholder.com/300" },
  { id: 4, title: "Space", description: "A space exploration wallpaper", url: "https://via.placeholder.com/300", coverUrl: "https://via.placeholder.com/300" },
]

export default function WallpaperWebsite() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredWallpapers, setFilteredWallpapers] = useState(initialWallpapers)
  const [currentPage, setCurrentPage] = useState('home')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [newWallpaperTitle, setNewWallpaperTitle] = useState('')
  const [newWallpaperDescription, setNewWallpaperDescription] = useState('')
  const [newWallpaperCover, setNewWallpaperCover] = useState<File | null>(null)
  const [newWallpaperFile, setNewWallpaperFile] = useState<File | null>(null)
  const [newWallpaperUrl, setNewWallpaperUrl] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentCoverUrl, setCurrentCoverUrl] = useState('')
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    const savedWallpapers = localStorage.getItem('wallpapers')
    if (savedWallpapers) {
      setFilteredWallpapers(JSON.parse(savedWallpapers))
    } else {
      setFilteredWallpapers(initialWallpapers)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('wallpapers', JSON.stringify(filteredWallpapers))
  }, [filteredWallpapers])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value
    setSearchTerm(term)
    const filtered = initialWallpapers.filter(wallpaper =>
      wallpaper.title.toLowerCase().includes(term.toLowerCase()) ||
      wallpaper.description.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredWallpapers(filtered)
  }

  const handleDownload = (url: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = 'wallpaper.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleAdminLogin = () => {
    if (username === 'admin' && password === 'password') {
      setIsAdmin(true)
      setCurrentPage('admin')
      setLoginError('')
    } else {
      setLoginError('Invalid username or password')
    }
  }

  const handleUploadWallpaper = () => {
    if (newWallpaperTitle && newWallpaperDescription && (newWallpaperCover || newWallpaperFile || newWallpaperUrl)) {
      const newWallpaper = {
        id: filteredWallpapers.length + 1,
        title: newWallpaperTitle,
        description: newWallpaperDescription,
        coverUrl: newWallpaperCover ? URL.createObjectURL(newWallpaperCover) : 'https://via.placeholder.com/300',
        file: newWallpaperFile ? newWallpaperFile : null,
        url: newWallpaperFile ? URL.createObjectURL(newWallpaperFile) : newWallpaperUrl,
      }
      setFilteredWallpapers([...filteredWallpapers, newWallpaper])
      setNewWallpaperTitle('')
      setNewWallpaperDescription('')
      setNewWallpaperCover(null)
      setNewWallpaperFile(null)
      setNewWallpaperUrl('')
    }
  }

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setNewWallpaperCover(file)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setNewWallpaperFile(file)
    }
  }

  const handleDeleteWallpaper = (id: number) => {
    setFilteredWallpapers(filteredWallpapers.filter(wallpaper => wallpaper.id !== id))
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prevCategories => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter(cat => cat !== category)
      } else {
        return [...prevCategories, category]
      }
    })
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenCover = (url: string) => {
    setCurrentCoverUrl(url)
    setIsDialogOpen(true)
  }

  const handleZoomIn = () => {
    setZoomLevel(prevZoom => prevZoom + 0.1)
  }

  const handleZoomOut = () => {
    setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.1))
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return (
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700">
              Welcome to our wallpaper website! We provide high-quality wallpapers for your desktop and mobile devices.
            </p>
          </div>
        )
      case 'contact':
        return (
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700">
              You can reach us at <a href="mailto:contact@example.com" className="text-blue-500">contact@example.com</a>.
            </p>
          </div>
        )
      case 'terms':
        return (
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
            <p className="text-gray-700">
              By using our website, you agree to the following terms and conditions...
            </p>
          </div>
        )
      case 'privacy':
        return (
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
            <p className="text-gray-700">
              We are committed to protecting your privacy. Our privacy policy outlines how we collect, use, and protect your information.
            </p>
          </div>
        )
      case 'categories':
        return (
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <ul className="list-disc pl-6">
              <li>Nature</li>
              <li>City</li>
              <li>Abstract</li>
              <li>Space</li>
            </ul>
          </div>
        )
      case 'admin':
        return (
          <div className="container mx-auto p-4">
            {isAdmin ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
                <div className="max-w-sm mx-auto mb-8">
                  <div className="mb-4">
                    <Label htmlFor="newWallpaperTitle" className="block text-sm font-medium text-gray-700">Title</Label>
                    <Input
                      id="newWallpaperTitle"
                      type="text"
                      value={newWallpaperTitle}
                      onChange={(e) => setNewWallpaperTitle(e.target.value)}
                      className="mt-1 block w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="newWallpaperDescription" className="block text-sm font-medium text-gray-700">Description</Label>
                    <Input
                      id="newWallpaperDescription"
                      type="text"
                      value={newWallpaperDescription}
                      onChange={(e) => setNewWallpaperDescription(e.target.value)}
                      className="mt-1 block w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="newWallpaperCover" className="block text-sm font-medium text-gray-700">Cover Photo</Label>
                    <Input
                      id="newWallpaperCover"
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
                      className="mt-1 block w-full"
                    />
                    {newWallpaperCover && (
                      <img src={URL.createObjectURL(newWallpaperCover)} alt="Cover" className="mt-2 w-full h-48 object-cover" />
                    )}
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="newWallpaperFile" className="block text-sm font-medium text-gray-700">Wallpaper File</Label>
                    <Input
                      id="newWallpaperFile"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mt-1 block w-full"
                    />
                    {newWallpaperFile && (
                      <img src={URL.createObjectURL(newWallpaperFile)} alt="Wallpaper" className="mt-2 w-full h-48 object-cover" />
                    )}
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="newWallpaperUrl" className="block text-sm font-medium text-gray-700">Wallpaper URL</Label>
                    <Input
                      id="newWallpaperUrl"
                      type="text"
                      value={newWallpaperUrl}
                      onChange={(e) => setNewWallpaperUrl(e.target.value)}
                      placeholder="Enter wallpaper URL"
                      className="mt-1 block w-full"
                    />
                  </div>
                  <Button className="w-full" onClick={handleUploadWallpaper}>Upload Wallpaper</Button>
                </div>
                <h2 className="text-2xl font-bold mb-4">Uploaded Wallpapers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredWallpapers.map(wallpaper => (
                    <Card key={wallpaper.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                      <img src={wallpaper.coverUrl} alt={wallpaper.title} className="w-full h-48 object-cover cursor-pointer" onClick={() => handleOpenCover(wallpaper.coverUrl)} />
                      <CardHeader>
                        <CardTitle className="text-lg font-bold">{wallpaper.title}</CardTitle>
                        <CardDescription>{wallpaper.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => handleDownload(wallpaper.file ? URL.createObjectURL(wallpaper.file) : wallpaper.url)}>
                          <Download className="mr-2" /> Download
                        </Button>
                        <Button variant="destructive" onClick={() => handleDeleteWallpaper(wallpaper.id)}>
                          <Trash className="mr-2" /> Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="max-w-sm mx-auto">
                <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
                <div className="mb-4">
                  <Label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full"
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full"
                  />
                </div>
                {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
                <Button className="w-full" onClick={handleAdminLogin}>Login</Button>
              </div>
            )}
          </div>
        )
      default:
        return (
          <div className="container mx-auto p-4">
            <div className="mb-4">
              <Label htmlFor="search" className="block text-sm font-medium text-gray-700">Search Wallpapers</Label>
              <Input
                id="search"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by title or description"
                className="mt-1 block w-full"
              />
            </div>
            <div className="mb-4">
              <Button variant="ghost" className="text-black" onClick={() => setCurrentPage('categories')}>
                Categories
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredWallpapers.map((wallpaper, index) => (
                <Card key={wallpaper.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img src={wallpaper.url} alt={wallpaper.title} className="w-full h-48 object-cover" />
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">{wallpaper.title}</CardTitle>
                    <CardDescription>{wallpaper.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline" onClick={() => handleDownload(wallpaper.url)}>
                      <Download className="mr-2" /> Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              {filteredWallpapers.length > 0 && (
                <div className="col-span-full flex justify-end">
                  <Button
                    variant="ghost"
                    className="p-2 bg-white rounded-full shadow-lg text-gray-800 hover:bg-gray-100"
                    onClick={handleScrollToTop}
                  >
                    <Rocket className="h-6 w-6" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="bg-white min-h-screen relative">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white p-0" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-lg font-bold text-white">Wallpaper Website</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-gray-300" onClick={() => setCurrentPage('home')}>
              <Home className="h-6 w-6" />
            </button>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsMenuOpen(false)}></div>
      )}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-white p-4 z-50 transform transition-transform duration-300 ease-in-out -translate-x-full" style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Menu</h2>
            <Button variant="ghost" className="text-gray-800 p-0" onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-gray-800 hover:bg-gray-100" onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}>
              Home
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-800 hover:bg-gray-100" onClick={() => { setCurrentPage('about'); setIsMenuOpen(false); }}>
              About
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-800 hover:bg-gray-100" onClick={() => { setCurrentPage('contact'); setIsMenuOpen(false); }}>
              Contact
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-800 hover:bg-gray-100" onClick={() => { setCurrentPage('terms'); setIsMenuOpen(false); }}>
              Terms of Service
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-800 hover:bg-gray-100" onClick={() => { setCurrentPage('privacy'); setIsMenuOpen(false); }}>
              Privacy Policy
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-800 hover:bg-gray-100" onClick={() => { setCurrentPage('admin'); setIsMenuOpen(false); }}>
              <User className="mr-2" /> {isAdmin ? 'Admin' : 'Login'}
            </Button>
          </div>
        </div>
      )}
      {renderPage()}
      <footer className="bg-gray-800 p-4 mt-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-lg">Wallpaper Website</div>
          <div className="space-x-4">
            <button className="text-white hover:text-gray-300" onClick={() => setCurrentPage('about')}>About</button>
            <button className="text-white hover:text-gray-300" onClick={() => setCurrentPage('contact')}>Contact</button>
            <button className="text-white hover:text-gray-300" onClick={() => setCurrentPage('terms')}>Terms of Service</button>
            <button className="text-white hover:text-gray-300" onClick={() => setCurrentPage('privacy')}>Privacy Policy</button>
          </div>
        </div>
        <div className="container mx-auto mt-4 text-center text-gray-400">
          © 2025 CheDex Wallpapers
        </div>
      </footer>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl mx-auto p-4">
          <DialogHeader>
            <DialogTitle>Full View</DialogTitle>
            <DialogDescription>
              View the cover photo in full size.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center">
            <div className="relative">
              <img src={currentCoverUrl} alt="Cover" className="max-w-full max-h-full" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }} />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button variant="outline" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

