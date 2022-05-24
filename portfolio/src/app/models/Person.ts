export class Person {
    
    private fullName: string;
    private dateOfBirth: string;
    private nationality: string;
    private email: string;
    private aboutMe: string;
    private job: string;
    private bannerImage: string;
    private profileImage: string;
    private location: string




    constructor(
        fullName: string, 
        dateOfBirth: string, 
        nationality: string, 
        email: string, 
        aboutMe: string, 
        job: string, 
        bannerImage: string, 
        profileImage: string, 
        location: string
    ) {
        this.fullName = fullName
        this.dateOfBirth = dateOfBirth
        this.nationality = nationality
        this.email = email
        this.aboutMe = aboutMe
        this.job = job
        this.bannerImage = bannerImage
        this.profileImage = profileImage
        this.location = location
    }
    public getFullName(): string {
        return this.fullName;
    }

    public setFullName(fullName: string): void {
        this.fullName = fullName;
    }

    public getDateOfBirth(): string {
        return this.dateOfBirth;
    }

    public setDateOfBirth(dateOfBirth: string): void {
        this.dateOfBirth = dateOfBirth;
    }

    public getNationality(): string {
        return this.nationality;
    }

    public setNationality(nationality: string): void {
        this.nationality = nationality;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getAboutMe(): string {
        return this.aboutMe;
    }

    public setAboutMe(aboutMe: string): void {
        this.aboutMe = aboutMe;
    }

    public getJob(): string {
        return this.job;
    }

    public setJob(job: string): void {
        this.job = job;
    }

    public getBannerImage(): string {
        return this.bannerImage;
    }

    public setBannerImage(bannerImage: string): void {
        this.bannerImage = bannerImage;
    }

    public getProfileImage(): string {
        return this.profileImage;
    }

    public setProfileImage(profileImage: string): void {
        this.profileImage = profileImage;
    }

    public getLocation(): string {
        return this.location;
    }

    public setLocation(location: string): void {
        this.location = location;
    }
    
}

