from django.shortcuts import render, redirect
from proxmoxer import ProxmoxAPI
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.urls import reverse
from django.core.serializers.json import DjangoJSONEncoder
from django.views.decorators.csrf import csrf_exempt
import json
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

api_url = '192.168.5.51:8006'
api_user = 'Api-jj@pve'
api_password = '123456'



def get_vms(request):
    proxmox = ProxmoxAPI(api_url, user=api_user, password=api_password, verify_ssl=False)
    
    nodes = sorted(proxmox.nodes.get(), key=lambda x: int(x['node'].replace('pve', '')))

    vms = []
    for node in nodes:
        for vm in proxmox.nodes(node['node']).qemu.get():
            vm['node'] = node['node']
            vms.append(vm)
    vms.sort(key=lambda x: x['vmid'])

    containers = []
    for node in nodes:
        for container in proxmox.nodes(node['node']).lxc.get():
            container['node'] = node['node']
            containers.append(container)
    containers.sort(key=lambda x: x['vmid'])

    context = {'nodes': nodes, 'vms': vms, 'containers': containers}
    return JsonResponse(context, safe=False)
    
        

def toggle_vm(api, vmid, action, node):
    if action == 'start':
        api.nodes(node).qemu(vmid).status.start.post()
    elif action == 'stop':
        api.nodes(node).qemu(vmid).status.stop.post()
    elif action == 'reboot':
        api.nodes(node).qemu(vmid).status.reboot.post()

def toggle_vm_view(request, vmid, action, node):
    if request.method == "POST":
        api = ProxmoxAPI(api_url, user=api_user, password=api_password, verify_ssl=False)
        toggle_vm(api, vmid, action, node)
        success = True
        return JsonResponse({'success': success})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})

@csrf_exempt
def create_vms(request):
    if request.method == "POST":
        data = json.loads(request.body)
        vm_count = data.get("vm_count")

        # Get other VM settings from data as necessary

        proxmox = ProxmoxAPI(api_url, user=api_user, password=api_password, verify_ssl=False)

        # Use the Proxmox API to create the VMs
        for _ in range(vm_count):
            # You can customize the VM creation process using the provided settings
            # For example, you can create a new VM by cloning an existing one
            # proxmox.nodes("pve1").qemu("100").clone.post(newid=next_vmid, name="new_vm_name")

            # Or create a new VM from scratch using the settings from the form
            # proxmox.nodes("pve1").qemu.post(vmid=next_vmid, name="new_vm_name", ...)
            
            # Make sure to increment the VM ID for each VM you create

            pass

        return JsonResponse({"status": "success"})
    else:
        return JsonResponse({"status": "error", "message": "Invalid request method"})

def table(request):
    return render(request, 'vm_viewer/table.html')

def bubles(request):
    return render(request, 'vm_viewer/bubles.html')