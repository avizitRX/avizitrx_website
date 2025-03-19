const FooterSection = () => {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 mt-10">
      <div className="container mx-auto py-6 flex flex-col md:flex-row items-center text-center md:text-left justify-center">
        <p className="text-md text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Avizit Roy | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
