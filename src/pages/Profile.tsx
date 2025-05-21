
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { User } from 'lucide-react';

const Profile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // Redirect to login if not authenticated
          navigate('/login');
          return;
        }

        // Set email from auth
        setEmail(session.user.email || '');
        
        // Fetch profile data
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (data) {
          setFullName(data.full_name || '');
          setIsSeller(data.is_seller || false);
        }
      } catch (error) {
        console.error('Error in profile page:', error);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication error",
          description: "Please login again to update your profile.",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName
        })
        .eq('id', session.user.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-farm-light-cream">
      <Navbar />
      
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-serif font-bold text-farm-dark-green mb-8">My Profile</h1>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-2">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${getInitials(fullName)}`} alt="Profile" />
                    <AvatarFallback className="bg-farm-dark-green text-farm-light-cream text-xl">
                      {fullName ? getInitials(fullName) : <User size={32} />}
                    </AvatarFallback>
                  </Avatar>
                  {isSeller && (
                    <span className="bg-farm-dark-green text-farm-light-cream text-xs px-2 py-1 rounded-full">
                      Seller Account
                    </span>
                  )}
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-medium text-gray-800">{fullName || 'User'}</h2>
                  <p className="text-gray-500">{email}</p>
                  
                  {isSeller && (
                    <Link to="/admin/dashboard">
                      <Button 
                        className="mt-4 bg-farm-dark-green hover:bg-farm-medium-green"
                      >
                        Go to Seller Dashboard
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <form onSubmit={handleUpdateProfile}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                      id="full-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500">Email cannot be changed.</p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-farm-dark-green hover:bg-farm-medium-green mt-4"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Updating...' : 'Update Profile'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
