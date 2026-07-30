function Pagination({
    currentPage,
    totalPages,
    onPageChange
}) {


    if(totalPages <= 1) {
        return null;
    }



    return (


        <div className="flex justify-center items-center gap-3 mt-10 flex-wrap">





            <button


                disabled={currentPage === 1}


                onClick={() => onPageChange(currentPage - 1)}


                className="

                px-5

                py-2

                rounded-xl

                bg-slate-800

                text-white

                border

                border-white/10

                hover:bg-slate-700

                transition

                duration-300

                disabled:opacity-40

                disabled:cursor-not-allowed

                "

            >

                ← Previous


            </button>









            {
                [...Array(totalPages)].map((_, index) => (


                    <button


                        key={index}


                        onClick={() => onPageChange(index + 1)}



                        className={

                            currentPage === index + 1

                            ?

                            `

                            w-10

                            h-10

                            rounded-xl

                            bg-blue-600

                            text-white

                            font-bold

                            shadow-lg

                            shadow-blue-500/30

                            transition

                            duration-300

                            `


                            :


                            `

                            w-10

                            h-10

                            rounded-xl

                            bg-white/10

                            text-white

                            border

                            border-white/10

                            hover:bg-white/20

                            transition

                            duration-300

                            `

                        }


                    >


                        {index + 1}


                    </button>


                ))
            }








            <button


                disabled={currentPage === totalPages}


                onClick={() => onPageChange(currentPage + 1)}



                className="

                px-5

                py-2

                rounded-xl

                bg-slate-800

                text-white

                border

                border-white/10

                hover:bg-slate-700

                transition

                duration-300

                disabled:opacity-40

                disabled:cursor-not-allowed

                "

            >

                Next →


            </button>





        </div>


    );

}


export default Pagination;