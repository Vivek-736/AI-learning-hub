/* eslint-disable @next/next/no-img-element */

const Intro = () => {
    return (
        <div className="flex flex-col min-h-80">
            <div className="flex flex-col md:flex-row items-center justify-center flex-grow p-8">
                {/* Left Side - Text */}
                <div className="md:w-1/2 text-center md:text-left flex flex-col items-center ">
                    <div className="h-auto w-[20vw] flex items-center justify-center">
                        <img src="logo.png" alt="Learnova" className="max-w-full h-auto" />
                    </div>
                    <h1 className="text-3xl font-bold">Simplifying Education, Enhancing Progress 🚀</h1>
                    <p className="text-lg mt-4">The Learnova is a platform where you can study and learn new technologies easily.</p>
                    <button className="bg-violet-600 text-white px-6 py-2 mt-4 rounded-lg hover:bg-violet-700">Check Now</button>
                </div>
                {/* Right Side - Image */}
                <div className="md:w-1/2 h-30 bg-black-300 flex items-center justify-center">
                {/* nice image */}
                <img src="hello.png" alt="sth" />
                </div>
            </div>
        </div>
    );
};

export default Intro;
