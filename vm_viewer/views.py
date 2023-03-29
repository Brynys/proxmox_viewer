from django.shortcuts import render

# Create your views here.

from proxmoxer import ProxmoxAPI

def get_vms(request):
    api_user = 'Api-jj@pve'
    api_password = '123456'
    api_url = '192.168.5.51'
    proxmox = ProxmoxAPI(api_url, user=api_user, password=api_password, verify_ssl=False)

    vms = []
    for node in proxmox.nodes.get():
        for vm in proxmox.nodes(node['node']).qemu.get():
            vms.append(vm)

    context = {'vms': vms}
    return render(request, 'vm_viewer/index.html', context)