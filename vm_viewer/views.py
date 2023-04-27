from django.shortcuts import render, redirect
from proxmoxer import ProxmoxAPI
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.urls import reverse
from django.core.serializers.json import DjangoJSONEncoder
from django.views.decorators.csrf import csrf_exempt
from proxmoxer.core import ResourceException
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
def create_vm(request):
    print("čusPitchus")
    if request.method == 'POST':
        data = json.loads(request.body)

        # Validate the incoming data (e.g., check for the presence of required fields)
        # ...

        proxmox = ProxmoxAPI(api_url, user=api_user, password=api_password, verify_ssl=False)

        config = {
            'name': data['Server-name'],
            'ostype': 'l26',
            'storage': data['Storage-location'],
            'iso': data['ISO-image'],
            'ide2': f"{data['Storage-location']}:iso/{data['ISO-image']},media=cdrom",
            'virtio0': f"{data['Disk-location']}:vm-{data['Server-name']},size={data['Disk-size']}G",
            'sockets': 1,
            'cores': data['CPU-cores'],
            'memory': data['Memory-size'],
            'net0': f"virtio,bridge={data['Network-Bridge']}",
        }

        node = data['Node']

        try:
            response = proxmox.nodes(node).qemu.create(**config)
            if response:
                return HttpResponse(status=200)  # Modify the response to return a HTTP 200 status code
            else:
                return HttpResponse(status=500)  # Modify the response to return a HTTP 500 status code
        except ResourceException as e:
            print(f"Error sending VM creation request: {str(e)}")
            return HttpResponse(status=500)  # Modify the response to return a HTTP 500 status code

    return HttpResponse(status=405)  # Modify the response to return a HTTP 405 status code



def table(request):
    return render(request, 'vm_viewer/table.html')

def bubles(request):
    return render(request, 'vm_viewer/bubles.html')


def table(request):
    return render(request, 'vm_viewer/table.html')

def bubles(request):
    return render(request, 'vm_viewer/bubles.html')