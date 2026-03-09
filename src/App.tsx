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

export default function InstaClonePro() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES);
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'create' | 'reels' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredPosts = posts.filter(p => 
    p.caption.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      
      {/* Sidebar - Desktop/Tablet */}
      <nav className="fixed left-0 top-0 h-full w-20 xl:w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-4 hidden md:flex flex-col gap-6 z-50">
        <div className="flex items-center gap-2 px-2 py-4">
          <Zap className="text-pink-600 w-8 h-8 flex-shrink-0" />
          <span className="text-xl font-bold hidden xl:block font-serif italic overflow-hidden whitespace-nowrap">InstaClone</span>
        </div>

        <div className="flex flex-col gap-2">
          <NavItem icon={<Home size={28} />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<Search size={28} />} label="Search" active={activeTab === 'search'} onClick={() => setActiveTab('search')} />
          <NavItem icon={<Bell size={28} />} label="Notifications" onClick={() => toast("No new notifications")} />
          <NavItem icon={<Mail size={28} />} label="Messages" onClick={() => toast("Messenger opening...")} />
          <NavItem icon={<Plus size={28} />} label="Create" onClick={() => setIsCreateModalOpen(true)} />
          <NavItem 
            icon={<Avatar className="w-7 h-7 border dark:border-neutral-700 mx-auto xl:mx-0"><AvatarImage src={CURRENT_USER.avatar} /></Avatar>} 
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
      <div className="md:ml-20 xl:ml-64 flex-1 transition-all duration-300">
        
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 p-4 flex justify-between items-center z-40 h-14">
          <span className="text-xl font-bold font-serif italic">InstaClone</span>
          <div className="flex items-center gap-4">
            <Heart size={24} className="cursor-pointer" onClick={() => toast("Notifications")} />
            <Mail size={24} className="cursor-pointer" onClick={() => toast("Messages")} />
          </div>
        </header>

        <main className="pb-24 md:pb-10 min-h-screen">
          {activeTab === 'home' && (
            <div className="max-w-[470px] mx-auto pt-6 px-0 sm:px-4">
              {/* Story Bar */}
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 px-4 sm:px-0">
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="relative p-1 rounded-full border-2 border-dashed border-neutral-300">
                    <Avatar className="w-14 h-14 sm:w-16 sm:h-16">
                      <AvatarImage src={CURRENT_USER.avatar} />
                    </Avatar>
                    <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full border-2 border-white dark:border-black p-0.5">
                      <Plus size={12} className="text-white" />
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs truncate w-16 text-center">Your Story</span>
                </div>
                {stories.map(story => (
                  <button key={story.id} onClick={() => setActiveStory(story)} className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className={cn(
                      "p-[2.5px] rounded-full bg-gradient-to-tr",
                      story.viewed ? "from-neutral-300 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700" : "from-yellow-400 via-red-500 to-purple-600"
                    )}>
                      <div className="bg-white dark:bg-black p-0.5 rounded-full">
                        <Avatar className="w-13 h-13 sm:w-15 sm:h-15 border border-neutral-100 dark:border-neutral-900">
                          <AvatarImage src={story.avatar} />
                        </Avatar>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs truncate w-16 text-center">{story.username}</span>
                  </button>
                ))}
              </div>

              {/* Feed */}
              <div className="flex flex-col gap-4 sm:gap-6">
                {filteredPosts.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="flex justify-center"><Search className="w-12 h-12 text-neutral-300" /></div>
                    <p className="text-neutral-500 font-medium px-4">No results found for "{searchQuery}"</p>
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
            <div className="max-w-screen-lg mx-auto p-2 sm:p-4 space-y-6">
              <div className="relative max-w-xl mx-auto px-2">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <Input 
                  placeholder="Search" 
                  className="pl-12 bg-neutral-100 dark:bg-neutral-900 border-none rounded-xl h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-0.5 sm:gap-1 md:gap-2">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className={cn(
                    "aspect-square relative group bg-neutral-200 dark:bg-neutral-800 overflow-hidden cursor-pointer",
                    i % 10 === 1 ? "md:row-span-2 md:col-span-2 aspect-auto" : ""
                  )}>
                    <img 
                      src={`https://picsum.photos/seed/${i + 60}/800/800`} 
                      className="w-full h-full object-cover"
                      alt="Explore"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-xs sm:text-base">
                      <span className="flex items-center"><Heart size={18} className="mr-1 fill-white" /> {Math.floor(Math.random()*1000)}</span>
                      <span className="flex items-center"><Mail size={18} className="mr-1 fill-white" /> {Math.floor(Math.random()*50)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-screen-md mx-auto px-4 pt-4 md:pt-10">
              <header className="flex flex-row md:flex-row gap-4 md:gap-16 items-start md:items-center mb-10">
                <Avatar className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0">
                  <AvatarImage src={CURRENT_USER.avatar} />
                </Avatar>
                <div className="flex-1 min-w-0 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <h1 className="text-xl font-normal truncate">{CURRENT_USER.username}</h1>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-semibold h-8 px-4 text-xs sm:text-sm">Edit profile</Button>
                      <Button variant="secondary" size="sm" className="hidden sm:inline-flex bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-semibold h-8 px-4 text-sm">View archive</Button>
                      <Settings className="cursor-pointer hidden sm:block h-6 w-6" />
                    </div>
                  </div>
                  
                  <div className="hidden md:flex gap-10">
                    <span className="text-sm"><strong>{CURRENT_USER.postsCount}</strong> posts</span>
                    <span className="text-sm"><strong>{CURRENT_USER.followers.toLocaleString()}</strong> followers</span>
                    <span className="text-sm"><strong>{CURRENT_USER.following.toLocaleString()}</strong> following</span>
                  </div>

                  <div className="hidden md:block">
                    <p className="font-semibold text-sm">{CURRENT_USER.fullName}</p>
                    <p className="whitespace-pre-line text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">{CURRENT_USER.bio}</p>
                  </div>
                </div>
              </header>

              {/* Mobile Profile Bio */}
              <div className="md:hidden space-y-1 mb-8">
                <p className="font-semibold text-sm">{CURRENT_USER.fullName}</p>
                <p className="whitespace-pre-line text-sm text-neutral-800 dark:text-neutral-200 leading-tight">{CURRENT_USER.bio}</p>
              </div>

              {/* Mobile Profile Stats */}
              <div className="flex md:hidden border-y border-neutral-100 dark:border-neutral-800 py-3 justify-around mb-2">
                <div className="flex flex-col items-center"><span className="font-bold text-sm">{CURRENT_USER.postsCount}</span><span className="text-neutral-500 text-xs">posts</span></div>
                <div className="flex flex-col items-center"><span className="font-bold text-sm">4.8k</span><span className="text-neutral-500 text-xs">followers</span></div>
                <div className="flex flex-col items-center"><span className="font-bold text-sm">890</span><span className="text-neutral-500 text-xs">following</span></div>
              </div>

              <Tabs activationMode="manual" defaultValue="posts" className="w-full">
                <TabsList className="bg-transparent border-t border-neutral-100 dark:border-neutral-800 rounded-none w-full flex justify-center gap-12 sm:gap-20 h-auto p-0">
                  <TabsTrigger value="posts" className="flex items-center gap-1.5 h-12 data-[state=active]:border-t data-[state=active]:border-black dark:data-[state=active]:border-white data-[state=active]:text-black dark:data-[state=active]:text-white rounded-none border-t-2 border-transparent p-0 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
                    <Zap size={14} className="sm:size-4" /> POSTS
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="flex items-center gap-1.5 h-12 data-[state=active]:border-t data-[state=active]:border-black dark:data-[state=active]:border-white data-[state=active]:text-black dark:data-[state=active]:text-white rounded-none border-t-2 border-transparent p-0 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
                    <Star size={14} className="sm:size-4" /> SAVED
                  </TabsTrigger>
                  <TabsTrigger value="tagged" className="flex items-center gap-1.5 h-12 data-[state=active]:border-t data-[state=active]:border-black dark:data-[state=active]:border-white data-[state=active]:text-black dark:data-[state=active]:text-white rounded-none border-t-2 border-transparent p-0 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
                    <User size={14} className="sm:size-4" /> TAGGED
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="posts" className="mt-1 sm:mt-4">
                  <div className="grid grid-cols-3 gap-0.5 sm:gap-4">
                    {posts.filter(p => p.userId === CURRENT_USER.id).map(post => (
                      <div key={post.id} className="aspect-square bg-neutral-200 dark:bg-neutral-800 relative group overflow-hidden cursor-pointer">
                        <img src={post.imageUrl} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-xs sm:text-sm">
                          <span className="flex items-center"><Heart size={16} className="mr-1 fill-white" /> {post.likes}</span>
                          <span className="flex items-center"><Mail size={16} className="mr-1 fill-white" /> {post.comments.length}</span>
                        </div>
                      </div>
                    ))}
                    <div className="aspect-square bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition" onClick={() => setIsCreateModalOpen(true)}>
                      <Plus className="w-8 h-8 text-neutral-400" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="saved" className="m-0 pt-4">
                   <div className="grid grid-cols-3 gap-0.5 sm:gap-4">
                     {posts.filter(p => p.hasBookmarked).map(post => (
                      <div key={post.id} className="aspect-square relative overflow-hidden">
                        <img src={post.imageUrl} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {posts.filter(p => p.hasBookmarked).length === 0 && (
                      <div className="col-span-3 py-20 text-center text-neutral-500">No saved posts yet.</div>
                    )}
                   </div>
                </TabsContent>
                <TabsContent value="tagged" className="m-0 p-10 sm:p-20 text-center">
                   <div className="max-w-xs mx-auto space-y-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-black dark:border-white rounded-full flex items-center justify-center mx-auto">
                        <User className="w-8 h-8 sm:w-10 sm:h-10" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold">Photos of you</h2>
                      <p className="text-sm text-neutral-500">When people tag you in photos, they'll appear here.</p>
                   </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 h-14 flex items-center justify-around px-2 md:hidden z-40 backdrop-blur-md bg-opacity-90">
        <button onClick={() => setActiveTab('home')} className="p-2">
          <Home size={26} className={activeTab === 'home' ? 'text-black dark:text-white' : 'text-neutral-500'} />
        </button>
        <button onClick={() => setActiveTab('search')} className="p-2">
          <Search size={26} className={activeTab === 'search' ? 'text-black dark:text-white' : 'text-neutral-500'} />
        </button>
        <button onClick={() => setIsCreateModalOpen(true)} className="p-2">
          <Plus size={28} className="text-neutral-500" />
        </button>
        <button onClick={() => setActiveTab('reels')} className="p-2">
          <Zap size={26} className={activeTab === 'reels' ? 'text-black dark:text-white' : 'text-neutral-500'} />
        </button>
        <button onClick={() => setActiveTab('profile')} className="p-2">
          <Avatar className={cn("w-7 h-7 ring-2", activeTab === 'profile' ? "ring-black dark:ring-white" : "ring-transparent")}>
            <AvatarImage src={CURRENT_USER.avatar} />
          </Avatar>
        </button>
      </nav>

      {/* Story Viewer Overlay */}
      {activeStory && (
        <div className="fixed inset-0 z-[100] bg-neutral-900 flex items-center justify-center md:bg-black/90 px-0 sm:px-10">
          <button className="absolute top-4 right-4 text-white p-2 z-[110]" onClick={() => setActiveStory(null)}>
            <X size={32} />
          </button>
          
          <div className="relative w-full max-w-sm aspect-[9/16] bg-black sm:rounded-xl overflow-hidden shadow-2xl">
            {/* Progress Bar */}
            <div className="absolute top-3 sm:top-4 left-2 right-2 flex gap-1 z-10">
              <div className="h-0.5 sm:h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white animate-[progress_5s_linear_infinite]" style={{ width: '100%' }}></div>
              </div>
            </div>

            {/* Story Content */}
            <img src={activeStory.imageUrl} className="w-full h-full object-cover" alt="story" />
            
            <div className="absolute top-8 left-4 flex items-center gap-3">
              <Avatar className="w-8 h-8 border border-white/20">
                <AvatarImage src={activeStory.avatar} />
              </Avatar>
              <span className="text-white font-semibold text-sm drop-shadow-md">{activeStory.username}</span>
              <span className="text-white/60 text-xs">3h</span>
            </div>

            <div className="absolute bottom-6 left-0 right-0 px-4 flex gap-3 h-11">
              <Input placeholder={`Reply to ${activeStory.username}...`} className="bg-transparent border-white/40 text-white placeholder:text-white/60 rounded-full h-full text-xs" />
              <div className="flex items-center gap-4">
                <Heart className="text-white hover:text-red-500 cursor-pointer" size={26} />
                <Send className="text-white cursor-pointer" size={26} />
              </div>
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
        <DialogContent className="sm:max-w-2xl p-0 max-h-[90vh] sm:h-[600px] flex flex-col overflow-hidden bg-white dark:bg-black border-neutral-200 dark:border-neutral-800">
          <DialogHeader className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex flex-row items-center relative">
            <DialogTitle className="text-center w-full font-semibold">Create new post</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-neutral-100 dark:divide-neutral-800 overflow-y-auto">
            <div className="md:flex-[1.5] bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-6 md:p-8">
              <div className="text-center space-y-4">
                <Image className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-neutral-400" />
                <p className="text-sm sm:text-lg font-medium">Drag photos and videos here</p>
                <Button className="bg-blue-500 hover:bg-blue-600 text-sm h-9">Select from computer</Button>
                <div className="mt-4 grid grid-cols-3 gap-2 justify-center">
                   {["nature", "city", "fashion"].map(t => (
                      <img 
                        key={t}
                        src={`https://picsum.photos/seed/${t}/300/300`} 
                        className="w-10 h-10 sm:w-16 sm:h-16 object-cover rounded cursor-pointer ring-2 ring-transparent active:ring-blue-500 transition" 
                        onClick={() => toast.success(`Selected image`)}
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
                className="flex-1 border-none focus-visible:ring-0 resize-none px-0 text-sm sm:text-base min-h-[100px] md:min-h-0"
                id="caption-input"
              />
              <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 space-y-2">
                <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400 p-2 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded">
                  <span className="text-xs">Add location</span>
                  <MapPin size={18} />
                </div>
                <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400 p-2 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded">
                  <span className="text-xs">Accessibility</span>
                  <ChevronDown size={18} />
                </div>
                <Button 
                   className="w-full mt-2 bg-blue-500 hover:bg-blue-600 font-bold h-10"
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

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 p-3 rounded-xl w-full transition group hover:bg-neutral-100 dark:hover:bg-neutral-900",
        active ? "font-bold" : "font-normal"
      )}
    >
      <div className="group-active:scale-95 transition-transform flex-shrink-0">{icon}</div>
      <span className="hidden xl:block text-base tracking-tight">{label}</span>
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
    <Card className="border-x-0 sm:border-x border-y sm:border-y border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black overflow-hidden rounded-none sm:rounded-lg shadow-none">
      <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 border border-neutral-100 dark:border-neutral-900 cursor-pointer">
            <AvatarImage src={post.userAvatar} />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold hover:text-neutral-500 cursor-pointer select-none">{post.username}</span>
            <span className="text-[10px] text-neutral-500">Suggested post</span>
          </div>
        </div>
        <button className="text-neutral-500 hover:text-black dark:hover:text-white p-1"><MoreHorizontal size={20} /></button>
      </CardHeader>
      
      <CardContent className="p-0 relative group touch-manipulation">
        <img 
          src={post.imageUrl} 
          alt="Post content" 
          className="w-full aspect-square object-cover"
          onDoubleClick={triggerDoubleTap}
          loading="lazy"
        />
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart size={80} className="fill-white text-white drop-shadow-2xl animate-[pop_0.8s_ease-out_forwards]" />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-3 flex flex-col items-start gap-2">
        {/* Actions Bar */}
        <div className="flex items-center justify-between w-full h-10">
          <div className="flex items-center gap-4">
            <button onClick={onLike} className="active:scale-90 transition">
              <Heart size={26} className={cn(post.hasLiked && "fill-red-500 text-red-500", "transition-colors")} />
            </button>
            <button className="active:scale-90 transition">
              <Mail size={26} />
            </button>
            <button className="active:scale-90 transition">
              <Send size={26} />
            </button>
          </div>
          <button onClick={onBookmark} className="active:scale-90 transition">
            <Star size={26} className={cn(post.hasBookmarked && "fill-neutral-900 dark:fill-white")} />
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-1 w-full">
          <p className="text-sm font-bold">{post.likes.toLocaleString()} likes</p>
          <div className="flex flex-wrap gap-1.5 items-baseline">
            <span className="text-sm font-bold hover:underline cursor-pointer">{post.username}</span>
            <p className="text-sm text-neutral-800 dark:text-neutral-200">{post.caption}</p>
          </div>
          
          {post.comments.length > 0 && (
            <button className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition w-fit mt-1">
              View all {post.comments.length} comments
            </button>
          )}

          <div className="space-y-0.5 mt-0.5">
            {post.comments.slice(-1).map(comment => (
              <div key={comment.id} className="flex gap-2 text-sm">
                <span className="font-bold">{comment.username}</span>
                <span className="truncate">{comment.text}</span>
              </div>
            ))}
          </div>

          <span className="text-[10px] text-neutral-400 uppercase mt-1.5 font-medium tracking-tight">
            {post.createdAt} · <span className="text-black dark:text-white cursor-pointer font-semibold">See translation</span>
          </span>
        </div>

        {/* Comment Input */}
        <form 
          className="w-full mt-2 hidden sm:flex items-center pt-2 border-t border-neutral-100 dark:border-neutral-800"
          onSubmit={(e) => {
            e.preventDefault();
            onComment(commentText);
            setCommentText('');
          }}
        >
          <Smile className="mr-3 text-neutral-500 cursor-pointer" size={24} />
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
            className="text-sm font-semibold text-blue-500 disabled:opacity-30 ml-2"
          >
            Post
          </button>
        </form>
      </CardFooter>
    </Card>
  );
}

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

const styleSheet = typeof document !== 'undefined' ? document.createElement("style") : null;
if (styleSheet) {
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    @keyframes progress {
      from { transform: translateX(-100%); }
      to { transform: translateX(0%); }
    }
    @keyframes pop {
      0% { transform: scale(0); opacity: 0; }
      15% { transform: scale(1.2); opacity: 1; }
      30% { transform: scale(0.95); opacity: 1; }
      45% { transform: scale(1.1); opacity: 1; }
      80% { opacity: 1; transform: scale(1); }
      100% { opacity: 0; transform: scale(1); }
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;
  document.head.appendChild(styleSheet);
}