const Footer = () => {

    var today = new Date(),
        date = today.getFullYear();



    return (
        <div class="footer">
            <div class="copyright">
                {/* <p className="mb-0">Copyright © <a href="http://68o.be7.mytemp.website" target="_blank">POCKET E-COM</a> </p> */}
                <p className="mb-0">Powered by <a href="http://68o.be7.mytemp.website" className='theme-red' target="_blank">Tusker Apps</a>&nbsp;{date}</p>
            </div>
        </div>
    )
}
export default Footer
