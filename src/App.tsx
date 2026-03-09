interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  hasLiked: boolean;
  hasBookmarked: boolean;
  comments: Comment[];
  createdAt: string;
}

interface Comment {
  id: string;
  username: string;
  text: string;
  createdAt: string;
}

interface Story {
  id: string;
  username: string;
  avatar: string;
  imageUrl: string;
  viewed: boolean;
}

interface User {
  id: string;
  username: string;
  fullName: string;
  bio: string;
  avatar: string;
  postsCount: number;
  followers: number;
  following: number;
}

const CURRENT_USER: User = {
  id: 'u1',
  username: 'alex_explorer',
  fullName: 'Alex Rivero',
  bio: 'Capturing moments in pixels. 📸\nBased in San Francisco.',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
  postsCount: 128,
  followers: 4802,
  following: 890,
};

const MOCK_STORIES: Story[] = [
  { id: 's1', username: 'nature_go', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop', imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500', viewed: false },
  { id: 's2', username: 'traveler_99', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500', viewed: false },
  { id: 's3', username: 'foodie_vibes', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500', viewed: true },
  { id: 's4', username: 'urban_art', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', imageUrl: 'https://images.unsplash.com/photo-1493397862567-47f52f2001fe?w=500', viewed: false },
  { id: 's5', username: 'zen_mode', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500', viewed: true },
];

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u2',
    username: 'mountain_man',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    caption: 'Woke up above the clouds today. Worth the 3am hike! 🏔️✨',
    likes: 1245,
    hasLiked: false,
    hasBookmarked: false,
    comments: [
      { id: 'c1', username: 'jane_doe', text: 'Absolutely spectacular view!', createdAt: '2h' },
      { id: 'c2', username: 'hiking_life', text: 'Where exactly is this?', createdAt: '1h' },
    ],
    createdAt: '4h ago',
  },
  {
    id: 'p2',
    userId: 'u3',
    username: 'urban_explorer',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
    caption: 'City lights and concrete dreams. 🌃 #metropolis #citylife',
    likes: 856,
    hasLiked: true,
    hasBookmarked: true,
    comments: [
      { id: 'c3', username: 'neon_soul', text: 'The lighting is perfect here.', createdAt: '30m' },
    ],
    createdAt: '6h ago',
  },
];

// === Main App Component ===
export default function InstaClonePro() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES);
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'create' | 'reels' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Computed Values
  const filteredPosts = posts.filter(p => 
    p.caption.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          hasLiked: !post.hasLiked,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleBookmark = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, hasBookmarked: !post.hasBookmarked } : post
    ));
    toast.success(posts.find(p => p.id === postId)?.hasBookmarked ? "Removed from bookmarks" : "Saved to bookmarks");
  };

  const handleAddComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Math.random().toString(),
            username: CURRENT_USER.username,
            text,
            createdAt: '1m'
          }]
        };
      }
      return post;
    }));
  };

  const handleCreatePost = (data: { imageUrl: string, caption: string }) => {
    const newPost: Post = {
      id: `p${Date.now()}`,
      userId: CURRENT_USER.id,
      username: CURRENT_USER.username,
      userAvatar: CURRENT_USER.avatar,
      imageUrl: data.imageUrl,
      caption: data.caption,
      likes: 0,
      hasLiked: false,
      hasBookmarked: false,
      comments: [],
      createdAt: 'Just now'
    };
    setPosts([newPost, ...posts]);
    setIsCreateModalOpen(false);
    toast.success("Post published successfully!");
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white transition-colors">
      
      {/* Sidebar - Desktop */}
      <nav className="fixed left-0 top-0 h-full w-20 lg:w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-4 hidden md:flex flex-col gap-6 z-50">
        <div className="flex items-center gap-2 px-2 py-4">
          <Zap className="text-pink-600 w-8 h-8" />
          <span className="text-xl font-bold hidden lg:block font-serif italic">InstaClone</span>
        </div>

        <div className="flex flex-col gap-2">
          <NavItem icon={<Home size={28} />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<Search size={28} />} label="Search" active={activeTab === 'search'} onClick={() => setActiveTab('search')} />
          <NavItem icon={<Bell size={28} />} label="Notifications" onClick={() => toast("No new notifications")} />
          <NavItem icon={<Mail size={28} />} label="Messages" onClick={() => toast("Messenger opening...")} />
          <NavItem icon={<Plus size={28} />} label="Create" onClick={() => setIsCreateModalOpen(true)} />
          <NavItem 
            icon={<Avatar className="w-7 h-7 border dark:border-neutral-700"><AvatarImage src={CURRENT_USER.avatar} /></Avatar>} 
            label="Profile" 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
          />
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <NavItem 
            icon={isDarkMode ? <Sun size={28} /> : <Moon size={28} />} 
            label={isDarkMode ? "Light Mode" : "Dark Mode"} 
            onClick={() => setIsDarkMode(!isDarkMode)} 
          />
          <NavItem icon={<Settings size={28} />} label="Settings" />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="md:ml-20 lg:ml-64 w-full md:w-[calc(100%-80px)] lg:w-[calc(100%-256px)] pb-20 md:pb-0">
        
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 p-4 flex justify-between items-center z-40">
          <span className="text-xl font-bold font-serif italic">InstaClone</span>
          <div className="flex items-center gap-4">
            <Heart size={24} onClick={() => toast("Notifications")} />
            <Mail size={24} onClick={() => toast("Messages")} />
          </div>
        </header>

        {activeTab === 'home' && (
          <div className="max-w-screen-sm mx-auto pt-6 px-4">
            {/* Story Bar */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6">
              <div className="flex flex-col items-center gap-1 min-w-[70px]">
                <div className="relative p-1 rounded-full border-2 border-dashed border-neutral-300">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={CURRENT_USER.avatar} />
                  </Avatar>
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full border-2 border-white dark:border-black p-0.5">
                    <Plus size={14} className="text-white" />
                  </div>
                </div>
                <span className="text-xs truncate w-full text-center">Your Story</span>
              </div>
              {stories.map(story => (
                <button key={story.id} onClick={() => setActiveStory(story)} className="flex flex-col items-center gap-1 min-w-[70px]">
                  <div className={cn(
                    "p-[3px] rounded-full bg-gradient-to-tr",
                    story.viewed ? "from-neutral-300 to-neutral-200" : "from-yellow-400 via-red-500 to-purple-600"
                  )}>
                    <div className="bg-white dark:bg-black p-0.5 rounded-full">
                      <Avatar className="w-14 h-14 border border-neutral-200 dark:border-neutral-800">
                        <AvatarImage src={story.avatar} />
                      </Avatar>
                    </div>
                  </div>
                  <span className="text-xs truncate w-full text-center">{story.username}</span>
                </button>
              ))}
            </div>

            {/* Feed */}
            <div className="flex flex-col gap-8 mb-10">
              {filteredPosts.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="flex justify-center"><Search className="w-12 h-12 text-neutral-300" /></div>
                  <p className="text-neutral-500 font-medium">No results found for "{searchQuery}"</p>
                  <Button variant="outline" onClick={() => setSearchQuery('')}>Clear Search</Button>
                </div>
              ) : (
                filteredPosts.map(post => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onLike={() => handleLike(post.id)} 
                    onBookmark={() => handleBookmark(post.id)}
                    onComment={(txt) => handleAddComment(post.id, txt)}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="max-w-5xl mx-auto p-4 space-y-6">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
              <Input 
                placeholder="Search accounts or posts..." 
                className="pl-10 bg-neutral-100 dark:bg-neutral-900 border-none rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-1 md:gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square relative group bg-neutral-200 dark:bg-neutral-800 overflow-hidden cursor-pointer">
                  <img 
                    src={`https://picsum.photos/seed/${i + 40}/600/600`} 
                    className="w-full h-full object-cover transition transform duration-500 group-hover:scale-110"
                    alt="Explore"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                    <span className="flex items-center font-bold text-white"><Heart size={20} className="mr-2 fill-white" /> {Math.floor(Math.random()*1000)}</span>
                    <span className="flex items-center font-bold text-white"><Mail size={20} className="mr-2 fill-white" /> {Math.floor(Math.random()*50)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto p-4 pt-10">
            <header className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-12">
              <Avatar className="w-20 h-20 md:w-36 md:h-36">
                <AvatarImage src={CURRENT_USER.avatar} />
              </Avatar>
              <div className="flex-1 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <h1 className="text-xl font-semibold">{CURRENT_USER.username}</h1>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-neutral-100 dark:bg-neutral-900 border-none font-semibold">Edit profile</Button>
                    <Button variant="outline" size="sm" className="bg-neutral-100 dark:bg-neutral-900 border-none font-semibold">View archive</Button>
                    <Settings className="ml-2 cursor-pointer" />
                  </div>
                </div>
                
                <div className="flex gap-10">
                  <span><strong>{CURRENT_USER.postsCount}</strong> posts</span>
                  <span><strong>{CURRENT_USER.followers.toLocaleString()}</strong> followers</span>
                  <span><strong>{CURRENT_USER.following.toLocaleString()}</strong> following</span>
                </div>

                <div className="space-y-1">
                  <p className="font-semibold">{CURRENT_USER.fullName}</p>
                  <p className="whitespace-pre-line text-sm">{CURRENT_USER.bio}</p>
                </div>
              </div>
            </header>

            <Separator className="mb-8" />
            
            <Tabs activationMode="manual" defaultValue="posts" className="w-full">
              <TabsList className="bg-transparent border-none flex justify-center gap-12 mb-6">
                <TabsTrigger value="posts" className="flex items-center gap-2 data-[state=active]:text-black dark:data-[state=active]:text-white rounded-none border-t-2 border-transparent data-[state=active]:border-black dark:data-[state=active]:border-white p-2">
                  <Zap size={16} /> POSTS
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-2 data-[state=active]:text-black dark:data-[state=active]:text-white rounded-none border-t-2 border-transparent data-[state=active]:border-black dark:data-[state=active]:border-white p-2">
                  <Star size={16} /> SAVED
                </TabsTrigger>
                <TabsTrigger value="tagged" className="flex items-center gap-2 data-[state=active]:text-black dark:data-[state=active]:text-white rounded-none border-t-2 border-transparent data-[state=active]:border-black dark:data-[state=active]:border-white p-2">
                  <User size={16} /> TAGGED
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts" className="mt-0">
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                  {posts.filter(p => p.userId === CURRENT_USER.id).map(post => (
                    <div key={post.id} className="aspect-square bg-neutral-200 dark:bg-neutral-800 relative group overflow-hidden">
                      <img src={post.imageUrl} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold">
                        <span className="flex items-center"><Heart size={18} className="mr-1 fill-white" /> {post.likes}</span>
                        <span className="flex items-center"><Mail size={18} className="mr-1 fill-white" /> {post.comments.length}</span>
                      </div>
                    </div>
                  ))}
                  <div className="aspect-square bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition" onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="w-10 h-10 text-neutral-400" />
                    <span className="text-xs font-semibold text-neutral-400 mt-2 text-center px-4">New Post</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="saved" className="mt-0">
                 <div className="grid grid-cols-3 gap-1">
                   {posts.filter(p => p.hasBookmarked).map(post => (
                    <div key={post.id} className="aspect-square relative overflow-hidden">
                      <img src={post.imageUrl} className="w-full h-full object-cover" />
                    </div>
                  ))}
                 </div>
              </TabsContent>
              <TabsContent value="tagged" className="mt-0 p-20 text-center">
                 <div className="max-w-xs mx-auto space-y-4">
                    <User className="w-16 h-16 mx-auto text-neutral-300" />
                    <h2 className="text-2xl font-bold">Photos of you</h2>
                    <p className="text-neutral-500">When people tag you in photos, they'll appear here.</p>
                 </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 h-14 flex items-center justify-between px-6 md:hidden z-40">
        <Home size={26} className={activeTab === 'home' ? 'text-black dark:text-white' : 'text-neutral-500'} onClick={() => setActiveTab('home')} />
        <Search size={26} className={activeTab === 'search' ? 'text-black dark:text-white' : 'text-neutral-500'} onClick={() => setActiveTab('search')} />
        <Plus size={26} className="text-neutral-500" onClick={() => setIsCreateModalOpen(true)} />
        <Zap size={26} className={activeTab === 'reels' ? 'text-black dark:text-white' : 'text-neutral-500'} />
        <Avatar className="w-7 h-7" onClick={() => setActiveTab('profile')}>
          <AvatarImage src={CURRENT_USER.avatar} />
        </Avatar>
      </nav>

      {/* Story Viewer Overlay */}
      {activeStory && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          <button className="absolute top-6 right-6 text-white hover:bg-white/10 p-2 rounded-full" onClick={() => setActiveStory(null)}>
            <X size={32} />
          </button>
          
          <div className="relative w-full max-w-lg aspect-[9/16] bg-black md:rounded-xl overflow-hidden shadow-2xl">
            {/* Progress Bar */}
            <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
              <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white animate-[progress_3s_linear_infinite]" style={{ width: '100%' }}></div>
              </div>
            </div>

            {/* Story Content */}
            <img src={activeStory.imageUrl} className="w-full h-full object-cover" />
            
            <div className="absolute top-8 left-4 flex items-center gap-3">
              <Avatar className="w-9 h-9 border border-white/20">
                <AvatarImage src={activeStory.avatar} />
              </Avatar>
              <span className="text-white font-semibold text-sm shadow-black drop-shadow-md">{activeStory.username}</span>
              <span className="text-white/60 text-xs">3h</span>
            </div>

            <div className="absolute bottom-6 left-0 right-0 px-4 flex gap-4">
              <Input placeholder={`Reply to ${activeStory.username}...`} className="bg-transparent border-white/50 text-white placeholder:text-white/50 rounded-full" />
              <Heart className="text-white hover:fill-red-500 hover:text-red-500 transition cursor-pointer" size={32} />
              <Send className="text-white cursor-pointer" size={32} />
            </div>
          </div>
          
          <button className="hidden md:flex absolute left-4 lg:left-20 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white">
            <ChevronLeft size={32} />
          </button>
          <button className="hidden md:flex absolute right-4 lg:right-20 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white">
            <ChevronRight size={32} />
          </button>
        </div>
      )}

      {/* Create Post Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-2xl p-0 h-[600px] flex flex-col overflow-hidden bg-white dark:bg-black border-neutral-200 dark:border-neutral-800">
          <DialogHeader className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex flex-row items-center justify-between">
            <DialogTitle className="text-center font-semibold mx-auto">Create new post</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 flex flex-col md:flex-row divide-x divide-neutral-100 dark:divide-neutral-800">
            <div className="flex-[1.5] bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center p-8">
              <div className="text-center space-y-4">
                <Image className="w-16 h-16 mx-auto text-neutral-400" />
                <p className="text-lg">Drag photos and videos here</p>
                <Button variant="default" className="bg-blue-500 hover:bg-blue-600">Select from computer</Button>
                {/* Mock Image Selection UI */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                   {["nature", "city", "fashion"].map(t => (
                      <img 
                        key={t}
                        src={`https://picsum.photos/seed/${t}/300/300`} 
                        className="w-16 h-16 object-cover rounded cursor-pointer ring-2 ring-transparent hover:ring-blue-500 transition" 
                        onClick={() => toast.success(`Selected ${t} image`)}
                      />
                   ))}
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col p-4 bg-white dark:bg-black">
              <div className="flex items-center gap-2 mb-4">
                <Avatar className="w-8 h-8"><AvatarImage src={CURRENT_USER.avatar} /></Avatar>
                <span className="font-semibold text-sm">{CURRENT_USER.username}</span>
              </div>
              <Textarea 
                placeholder="Write a caption..." 
                className="flex-1 border-none focus-visible:ring-0 resize-none px-0 text-base"
                id="caption-input"
              />
              <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4 space-y-3">
                <div className="flex justify-between items-center text-neutral-500 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 p-2 rounded transition">
                  <span className="text-sm">Add location</span>
                  <MapPin size={20} />
                </div>
                <div className="flex justify-between items-center text-neutral-500 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 p-2 rounded transition">
                  <span className="text-sm">Accessibility</span>
                  <ChevronDown size={20} />
                </div>
                <Button 
                   className="w-full mt-4 bg-blue-500 hover:bg-blue-600 font-bold"
                   onClick={() => {
                     const cap = (document.getElementById('caption-input') as HTMLTextAreaElement)?.value;
                     handleCreatePost({
                       imageUrl: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=800',
                       caption: cap || 'A beautiful mountain day!'
                     });
                   }}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

// === Sub-Components ===

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 p-3 rounded-lg w-full transition group hover:bg-neutral-100 dark:hover:bg-neutral-900",
        active ? "font-bold" : "font-normal"
      )}
    >
      <div className="group-hover:scale-110 transition-transform">{icon}</div>
      <span className="hidden lg:block text-lg">{label}</span>
      {active && <div className="ml-auto w-1 h-1 bg-pink-600 rounded-full hidden lg:block" />}
    </button>
  );
}

function PostCard({ post, onLike, onBookmark, onComment }: { 
  post: Post, 
  onLike: () => void, 
  onBookmark: () => void,
  onComment: (txt: string) => void 
}) {
  const [commentText, setCommentText] = useState('');
  const [showHeart, setShowHeart] = useState(false);
  const heartTimeout = useRef<any>(null);

  const triggerDoubleTap = () => {
    if (!post.hasLiked) onLike();
    setShowHeart(true);
    if (heartTimeout.current) clearTimeout(heartTimeout.current);
    heartTimeout.current = setTimeout(() => setShowHeart(false), 800);
  };

  return (
    <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black overflow-hidden rounded-none sm:rounded-lg">
      <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 border border-neutral-100 dark:border-neutral-800">
            <AvatarImage src={post.userAvatar} />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold hover:underline cursor-pointer">{post.username}</span>
            <span className="text-xs text-neutral-500">Suggested for you</span>
          </div>
        </div>
        <button className="text-neutral-500 hover:text-black dark:hover:text-white"><MoreHorizontal /></button>
      </CardHeader>
      
      <CardContent className="p-0 relative group">
        <img 
          src={post.imageUrl} 
          alt="Post content" 
          className="w-full aspect-square object-cover"
          onDoubleClick={triggerDoubleTap}
        />
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center animate-[pop_0.8s_ease-out_forwards]">
            <Heart size={100} className="fill-white text-white drop-shadow-2xl" />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-3 flex flex-col items-start gap-3">
        {/* Actions Bar */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <button onClick={onLike} className="hover:scale-110 active:scale-95 transition">
              <Heart size={26} className={cn(post.hasLiked && "fill-red-500 text-red-500", "transition-colors")} />
            </button>
            <button className="hover:scale-110 active:scale-95 transition">
              <Mail size={26} />
            </button>
            <button className="hover:scale-110 active:scale-95 transition">
              <Send size={26} />
            </button>
          </div>
          <button onClick={onBookmark} className="hover:scale-110 active:scale-95 transition">
            <Star size={26} className={cn(post.hasBookmarked && "fill-neutral-900 dark:fill-white")} />
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-bold">{post.likes.toLocaleString()} likes</p>
          <div className="flex gap-2">
            <span className="text-sm font-bold">{post.username}</span>
            <p className="text-sm">{post.caption}</p>
          </div>
          
          {post.comments.length > 0 && (
            <button className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition w-fit">
              View all {post.comments.length} comments
            </button>
          )}

          <div className="space-y-1">
            {post.comments.slice(-2).map(comment => (
              <div key={comment.id} className="flex gap-2 text-sm">
                <span className="font-bold">{comment.username}</span>
                <span>{comment.text}</span>
              </div>
            ))}
          </div>

          <span className="text-[10px] text-neutral-500 uppercase mt-1">{post.createdAt}</span>
        </div>

        {/* Comment Input */}
        <form 
          className="w-full mt-2 flex items-center pt-3 border-t border-neutral-100 dark:border-neutral-800"
          onSubmit={(e) => {
            e.preventDefault();
            onComment(commentText);
            setCommentText('');
          }}
        >
          <Smile className="mr-3 text-neutral-400 cursor-pointer hover:text-neutral-600" size={24} />
          <input 
            type="text" 
            placeholder="Add a comment..." 
            className="flex-1 bg-transparent border-none text-sm outline-none placeholder:text-neutral-500"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={!commentText.trim()}
            className="text-sm font-semibold text-blue-500 disabled:text-blue-200 ml-2"
          >
            Post
          </button>
        </form>
      </CardFooter>
    </Card>
  );
}

// === Generic Icons (Simulated Smile for comment bar) ===
function Smile({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      className={className} 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

// Inject keyframes locally
const styleSheet = typeof document !== 'undefined' ? document.createElement("style") : null;
if (styleSheet) {
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    @keyframes progress {
      from { width: 0%; }
      to { width: 100%; }
    }
    @keyframes pop {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(1); opacity: 0; }
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;
  document.head.appendChild(styleSheet);
}