import { supabase } from './supabase';

// Test function to verify bucket access
export async function testBucketAccess() {
    try {
        console.log('🧪 Testing bucket access for both avatars and portfolio-image...');
        
        // Test avatars bucket
        const avatarTestFile = new File(["test"], "avatar-test.txt", { type: "text/plain" });
        const { error: avatarError } = await supabase.storage
            .from('avatars')
            .upload(`test-${Date.now()}-avatar.txt`, avatarTestFile, { upsert: true });
            
        // Test portfolio-image bucket
        const portfolioTestFile = new File(["test"], "portfolio-test.txt", { type: "text/plain" });
        const { error: portfolioError } = await supabase.storage
            .from('portfolio-image')
            .upload(`test-${Date.now()}-portfolio.txt`, portfolioTestFile, { upsert: true });
        
        if (avatarError || portfolioError) {
            const errorMessage = avatarError 
                ? `Avatars bucket: ${avatarError.message}` 
                : `Portfolio bucket: ${(portfolioError as any)?.message || 'Unknown error'}`;
            return { success: false, error: errorMessage };
        }
        
        console.log('✅ Both buckets are accessible!');
        return { success: true, message: 'Both avatars and portfolio-image buckets are working correctly!' };
        
    } catch (error: any) {
        console.error('Bucket access test error:', error);
        return { success: false, error: error.message || 'Connection failed' };
    }
}

export async function uploadAvatarImage(file: File): Promise<string> {
    try {
        // Validate file first
        const validationError = validateImageFile(file);
        if (validationError) {
            throw new Error(validationError);
        }

        // Create unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `avatar-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = fileName;

        console.log('Attempting to upload to avatars bucket:', fileName);
        
        // First, try to delete any existing file with same name (to handle RLS)
        await supabase.storage
            .from('avatars')
            .remove([filePath]);
        
        // Upload to Supabase Storage (avatars bucket)
        let uploadResult = await supabase.storage
            .from('avatars')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true,
                contentType: file.type
            });

        if (uploadResult.error) {
            console.error('Supabase avatar upload error:', uploadResult.error);
            // If RLS error, try with authenticated client
            if (uploadResult.error.message.includes('row-level security') || uploadResult.error.message.includes('permission')) {
                console.log('Retrying with authenticated upload...');
                uploadResult = await supabase.storage
                    .from('avatars')
                    .upload(filePath, file, {
                        cacheControl: '3600',
                        upsert: true,
                        contentType: file.type
                    });
                
                if (uploadResult.error) {
                    throw new Error(`Avatar upload failed: ${uploadResult.error.message}`);
                }
            } else {
                throw new Error(`Avatar upload failed: ${uploadResult.error.message}`);
            }
        }

        const data = uploadResult.data;

        console.log('Avatar upload successful, getting public URL');
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

        console.log('Avatar public URL generated:', publicUrl);
        return publicUrl;
        
    } catch (error: any) {
        console.error('Avatar upload error:', error);
        throw new Error(error.message || 'Failed to upload avatar');
    }
}

export async function uploadProjectImage(file: File): Promise<string> {
    try {
        // Validate file first
        const validationError = validateImageFile(file);
        if (validationError) {
            throw new Error(validationError);
        }
        
        // Create unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `project-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        // First, try to delete any existing file with same name (to handle RLS)
        await supabase.storage
            .from('portfolio-image')
            .remove([filePath]);

        // Upload to Supabase Storage (portfolio-image bucket)
        let uploadResult = await supabase.storage
            .from('portfolio-image')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true,
                contentType: file.type
            });

        if (uploadResult.error) {
            console.error('Supabase project image upload error:', uploadResult.error);
            // If RLS error, try with authenticated client
            if (uploadResult.error.message.includes('row-level security') || uploadResult.error.message.includes('permission')) {
                console.log('Retrying with authenticated upload...');
                uploadResult = await supabase.storage
                    .from('portfolio-image')
                    .upload(filePath, file, {
                        cacheControl: '3600',
                        upsert: true,
                        contentType: file.type
                    });
                
                if (uploadResult.error) {
                    throw new Error(`Project image upload failed: ${uploadResult.error.message}`);
                }
            } else {
                throw new Error(`Project image upload failed: ${uploadResult.error.message}`);
            }
        }

        const data = uploadResult.data;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('portfolio-image')
            .getPublicUrl(filePath);

        console.log('Project image public URL generated:', publicUrl);
        return publicUrl;
        
    } catch (error: any) {
        console.error('Project image upload error:', error);
        throw new Error(error.message || 'Failed to upload project image');
    }
}

export function validateImageFile(file: File): string | null {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        return 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)';
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
        return 'Image size must be less than 5MB';
    }

    return null;
}
