Node1 = {Name:"Node1",IP:"192.168.5.51",Disk:100,RAM:64,id:1,status:true};
Node2 = {Name:"Node2",IP:"192.168.5.52",Disk:200,RAM:32,id:2,status:true};
Node3 = {Name:"SuperNode",IP:"192.168.5.53",Disk:2000,RAM:256,id:3,status:true};
const NodesList = [Node1,Node2,Node3];

Server1 = {SName:"Server1",IP:"10.10.0.5",Disk:10,RAM:1,Node:1,status:true};
Server2 = {SName:"Server2",IP:"10.10.0.6",Disk:20,RAM:10,Node:2,status:true};
Server3 = {SName:"Server3",IP:"10.10.0.7",Disk:30,RAM:5,Node:2,status:false};
Server4 = {SName:"SuperServer",IP:"10.10.0.100",Disk:1000,RAM:128,Node:3,status:true};
const ServersList = [Server1,Server2,Server3,Server4];

function showNode(){
    const Nodes123 = document.getElementById("Nodes");
    NodesList.forEach(Node => {
        const NodeElement = document.getElementById(Node.Name);
        if(NodeElement == null){
            if(Node.status){
                statuscolor = "green";
                statusanimation = "inline-flex";
            }else{statuscolor = "red";
                statusanimation = "hidden";}
            const NodeElement = document.createElement("div");
            NodeElement.innerHTML = `
                        <span
                            class="absolute `+statusanimation+` items-center justify-center w-8 h-8 bg-`+statuscolor+`-600 rounded-full animate-ping text-indigo-50 -top-4 left-4">
                        </span>
                        <span
                            class="absolute inline-flex items-center justify-center w-8 h-8 bg-`+statuscolor+`-600 rounded-full text-indigo-50 -top-4 left-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-slate-300" viewBox="0 0 512 512"><path d="M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4h87c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31H476.3c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240h-132c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9H16c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1v5.8c0 16.9-2.8 33.5-8.3 49.1z"/></svg>
                        </span>
                        <h3 class="float-right mb-3 text-lg font-semibold text-sky-300 md:text-xl">CPU 0%</h3>
                        <h3 class="mb-3 text-lg font-semibold text-indigo-300 md:text-xl">
                            `+Node.Name+`
                        </h3>
                        <button type="button" id="`+Node.Name+`open-popup" class="float-right text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" data-modal-target="authentication-modal" data-modal-toggle="authentication-modal">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-green-400" viewBox="0 0 448 512"><path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z"/></svg>
                            </button>
                        
                        <p class="text-gray-300">
                            IP: `+Node.IP+` <br />
                            Disk: `+Node.Disk+`GB <br />
                            RAM: `+Node.RAM+`GB <br />
                        </p>
                        
                        `;
                    NodeElement.className = "relative p-5 pt-8 bg-[#282828] rounded-lg transition-all duration-300 ease-in-out md:hover:scale-105";
                    NodeElement.id = Node.id;
                    Nodes123.appendChild(NodeElement);
            NodeElement.addEventListener("click", function(){showServer(Node.id,Node.Name)});

            const popup = document.createElement("div");
            body = document.getElementById('body');
            popup.id = Node.Name+"popup";
            popup.className ="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 hidden";
            popup.innerHTML = `
            
                        <!-- Add the popup content -->
                        <div class="relative w-full h-full max-w-md md:h-auto">
                            <!-- Modal content -->
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button type="button" id="`+Node.Name+`close-popup" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="px-6 py-6 lg:px-8">
                                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create Server on Node `+Node.Name+`</h3>
                                    <form class="space-y-5" action="#">
                                            <div>
                                            <label for="Server-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Server Name</label>
                                            <input type="text" name="Server-name" id="Server-name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Server70" required>
                                            </div>
                                           <div class="flex">
                                           <div>
                                            <label for="Server-disk" class=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Server Disk (MB)</label>
                                            <input type="number" min="0" name="Server-disk" id="Server-disk" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40% p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="40000" required>
                                           </div>
                                           <div class="ml-6">
                                            <label for="Server-ram" class=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Server RAM (MB)</label>
                                            <input type="number" name="Server-ram" id="Server-ram" min="0" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40% p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="16000" required>
                                           </div>
                                           </div>
                                            <div>
                                            <label for="Server-image" class="mb-2 block  text-sm font-medium text-gray-900 dark:text-white">Server Image</label>
                                            <input type="text" name="Server-image" id="Server-image" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Ubuntu" required>
                                            </div>
                                            <div>
                                            <label for="HowMany" class=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">How Many Servers?</label>
                                            <input type="number" name="HowMany" id="HowMany" min="1" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40% p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="3" required>
                                            </div>
                                        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Server</button>
                                    </form>
                                </div>
                            </div>
                        </div>
            `;
            body.appendChild(popup);
            
            const openPopupButton = document.getElementById(Node.Name+"open-popup");
            const closePopupButton = document.getElementById(Node.Name+"close-popup");
            
            
            openPopupButton.addEventListener("click", () => {
                popup.classList.remove("hidden");
            });
            
            closePopupButton.addEventListener("click", () => {
                popup.classList.add("hidden");
            });
        }
    });
}
  function showServer(NodeNumber,Name) {
    const Servers = document.getElementById("Servers");
    const ServersHeder = document.getElementById("ServersHeder");
    ServersHeder.innerHTML = Name + " Servers"
    ServersList.forEach(Server => {
        if(Server.Node==NodeNumber){
            
            const ServerElement = document.getElementById(Server.SName);
            if(ServerElement==null){
                if(Server.status){
                    statuscolor = "green";
                statusanimation = "inline-flex";
            }else{statuscolor = "red";
                statusanimation = "hidden";}
                const ServerElement = document.createElement("div");
                ServerElement.innerHTML = `
                <span
                    class="absolute `+statusanimation+` items-center justify-center w-8 h-8 bg-`+statuscolor+`-600 rounded-full animate-ping text-indigo-50 -top-4 left-4">
                </span>
                <span
                    class="absolute inline-flex items-center justify-center w-8 h-8 bg-`+statuscolor+`-600 rounded-full text-indigo-50 -top-4 left-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-slate-300" viewBox="0 0 512 512"><path d="M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4h87c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31H476.3c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240h-132c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9H16c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1v5.8c0 16.9-2.8 33.5-8.3 49.1z"/></svg>
                </span>

                <h3 class="mb-3 text-lg font-semibold text-indigo-300 md:text-xl">
                    `+Server.SName+`
                </h3>
                <button type="button" class="float-right text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-red-400" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>
                </button>
                
                <button type="button" class="float-right text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-slate-300" viewBox="0 0 512 512"><path d="M89.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L370.3 160H320c-17.7 0-32 14.3-32 32s14.3 32 32 32H447.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L398.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C57.2 122 39.6 150.7 28.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM23 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L109.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H32.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>
                </button>
                
                <button type="button" class="float-right text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-green-400" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                </button>

                <p class="text-gray-300">
                    IP: `+Server.IP+` <br />
                    Disk: `+Server.Disk+`GB<br />
                    RAM: `+Server.RAM+`GB<br />
                </p>
                `;
                ServerElement.className = "relative p-5 pt-8 bg-[#282828] rounded-lg transition-all duration-300 ease-in-out md:hover:scale-105";
                ServerElement.id = Server.SName;
                Servers.appendChild(ServerElement);
            }
            else {
                const ServerElement = document.getElementById(Server.SName);
                Servers.removeChild(ServerElement);
            }
        }
        else{ 
            const ServerElement = document.getElementById(Server.SName);
            if(ServerElement!==null){
                Servers.removeChild(ServerElement);
            }
        }
    });
  }

    

    
  
  showNode();
  
